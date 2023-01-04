import { Cart } from "@prisma/client";

export interface ICartRepository {
    getAll(): Promise<Cart[]>,
    createCart(id:string, total: number, userId: number): Promise<Cart | null>
}