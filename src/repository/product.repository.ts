import { PrismaClient, Product } from "@prisma/client";
import { v4 } from "uuid";
import { Conflict, NotFound, OK, ResponseBody} from "../presenters/index.presenter";

const prisma = new PrismaClient();


export class ProductRepository {
    async getAll(): Promise<Product[]> {
        const products = await prisma.product.findMany();
        return products
    }

    async getById(id: string): Promise<Product| null> {
        const product = await this.findProduct({id});
        return product
    }

    async create({description, price, brand, qtd}: Omit<Product, 'id'>): Promise<Product | null> {

        const product = await prisma.product.create({
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
        
        const product = await prisma.product.update({
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
        
        const product = await prisma.product.delete({
            where: {
                id
            }
        })

        return product
    }

    
    async findProduct(param: Partial<Product>) {

        const {id, description} = param;

        const productExists = await prisma.product.findFirst({
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