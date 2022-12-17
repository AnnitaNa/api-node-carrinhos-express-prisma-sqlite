import { PrismaClient, Product } from "@prisma/client";
import { v4 } from "uuid";
import { BadRequest, Conflict, NotFound, OK, ResponseBody} from "../presenters/index.presenter";
import { ProductRepository } from "../repository/product.repository";


const productRepository = new ProductRepository();
export class ProductService {
    async getAll(): Promise<Product[]> {
        const products = await productRepository.getAll();
        return products
    }

    async getById(id: string): Promise<ResponseBody<Product> | null> {
        const product = await productRepository.getById(id);

        if (!product) return new NotFound();

        return new OK(product)
    }

    async create({description, price, brand, qtd}: Omit<Product, 'id'>): Promise<ResponseBody<Product> | null> {

        const productExists = await productRepository.findProduct({description});

        if (productExists) return new Conflict("There is already a product with this description")
        
        const product = await productRepository.create({description, price, brand, qtd})
        if(!product) return new BadRequest("It was not possible to create");

        return new OK(product)
    
    }

    async update(id: string, {description, price, qtd, brand}:  Omit<Product, 'id'>): Promise<ResponseBody<Product> | null> {
        
        const productExists = await productRepository.findProduct({id});
        if (!productExists) return new NotFound();
        
        const product = await productRepository.update(id, {description, price, qtd, brand});
        if(!product) return new BadRequest("It was not possible to update");

        return new OK(product)

    }

    async delete(id: string): Promise<ResponseBody<Product> | null> {
        
        const productExists = await productRepository.findProduct({id});
        if (!productExists) return new NotFound();

        const product = await productRepository.delete(id);
        if(!product) return new BadRequest("It was not possible to delete")

        return new OK(product)
    }

}