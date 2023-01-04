import { Product } from "@prisma/client";
import { BadRequest, Conflict, NotFound, OK, ResponseBody} from "@presenters/index.presenter";

import { inject, injectable } from "tsyringe";
import { IProductRepository } from "@interfaces/IProductRepository.interface";

@injectable()
export class ProductService {
    constructor(@inject('ProductRepository') private productRepository: IProductRepository){}

    async getAll(): Promise<Product[]> {
        const products = await this.productRepository.getAll();
        return products
    }

    async getById(id: string): Promise<ResponseBody<Product> | null> {
        const product = await this.productRepository.getById(id);

        if (!product) return new NotFound();

        return new OK(product)
    }

    async create({description, price, brand, qtd}: Omit<Product, 'id'>): Promise<ResponseBody<Product> | null> {

        const productExists = await this.productRepository.findProduct({description});

        if (productExists) return new Conflict("There is already a product with this description")
        
        const product = await this.productRepository.create({description, price, brand, qtd})
        if(!product) return new BadRequest("It was not possible to create");

        return new OK(product)
    
    }

    async update(id: string, {description, price, qtd, brand}:  Omit<Product, 'id'>): Promise<ResponseBody<Product> | null> {
        
        const productExists = await this.productRepository.findProduct({id});
        if (!productExists) return new NotFound();
        
        const product = await this.productRepository.update(id, {description, price, qtd, brand});
        if(!product) return new BadRequest("It was not possible to update");

        return new OK(product)

    }

    async delete(id: string): Promise<ResponseBody<Product> | null> {
        
        const productExists = await this.productRepository.findProduct({id});
        if (!productExists) return new NotFound();

        const product = await this.productRepository.delete(id);
        if(!product) return new BadRequest("It was not possible to delete")

        return new OK(product)
    }

}