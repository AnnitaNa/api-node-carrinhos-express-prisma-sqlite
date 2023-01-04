import { Product } from "@prisma/client";

export interface IProductRepository {
    getAll(): Promise<Product[]>,
    getById(id: string): Promise<Product| null> ,
    create({description, price, brand, qtd}: Omit<Product, 'id'>): Promise<Product | null>,
    update(id: string, {description, price, qtd}:  Omit<Product, 'id'>): Promise<Product | null>,
    delete(id: string): Promise<Product | null>,
    findProduct(param: Partial<Product>): Promise<Product | null>
}
