import { IProductRepository } from "@interfaces/IProductRepository.interface";
import { PrismaClient, Product } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";


@injectable()
export class ProductRepository implements IProductRepository{
    constructor(@inject('PrismaClient') private readonly prisma: PrismaClient){}

    async getAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany();
        return products
    }

    async getById(id: string): Promise<Product| null> {
        const product = await this.findProduct({id});
        return product
    }

    async create({description, price, brand, qtd}: Omit<Product, 'id'>): Promise<Product | null> {

        const product = await this.prisma.product.create({
            data: {
                id: v4(),
                description, 
                price, 
                brand,
                qtd
            }
        })
        return product
    
    }

    async update(id: string, {description, price, qtd}:  Omit<Product, 'id'>): Promise<Product | null> {
        
        const product = await this.prisma.product.update({
            data: {
                description, 
                price, 
                qtd
            },
            where: {
                id
            }
        })
        return product

    }

    async delete(id: string): Promise<Product | null> {
        
        const product = await this.prisma.product.delete({
            where: {
                id
            }
        })

        return product
    }

    
    async findProduct(param: Partial<Product>): Promise<Product | null> {

        const {id, description} = param;

        const productExists = await this.prisma.product.findFirst({
            where: 
                {
                    id: this.isDefined(id),
                    description: this.isDefined(description)
                }
        })

        return productExists
    }

   private isDefined(T: any) {
       return  T != null ? T : undefined
       // if the property is not passed (null), it will put it values as undefined. 
       //when undefined, Prisma does nothing with it
    }
}