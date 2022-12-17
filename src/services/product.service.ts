import { PrismaClient, Product } from "@prisma/client";
import { v4 } from "uuid";
import { Conflict, NotFound, OK, ResponseBody} from "../presenters/index.presenter";

const prisma = new PrismaClient();


export class ProductService {
    async getAll(): Promise<Product[]> {
        const products = await prisma.product.findMany();
        return products
    }

    async getById(id: string): Promise<ResponseBody<Product> | null> {
        const product = await this.findProduct({id});

        if (!product) return new NotFound();

        return new OK(product)
    }

    async create({description, price, brand, qtd}: Omit<Product, 'id'>): Promise<ResponseBody<Product> | null> {

        const productExists = await this.findProduct({description});

        if (productExists) return new Conflict("There is already a product with this description")
        
        const product = await prisma.product.create({
            data: {
                id: v4(),
                description, 
                price, 
                brand,
                qtd
            }
        })
        return new OK(product)
    
    }

    async update(id: string, {description, price, qtd}:  Omit<Product, 'id'>): Promise<ResponseBody<Product> | null> {
        
        const productExists = await this.findProduct({id});
        if (!productExists) return new NotFound();
        
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
        return new OK(product)

    }

    async delete(id: string): Promise<ResponseBody<Product> | null> {
        
        const productExists = await this.findProduct({id});
        if (!productExists) return new NotFound();

        const product = await prisma.product.delete({
            where: {
                id
            }
        })

        return new OK(product)
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