import { Cart, CartItems, PrismaClient, Product } from "@prisma/client";
import { v4 } from "uuid";import { IcartItems } from "../interfaces/IcartItems.interfaces";

const prisma = new PrismaClient();

export class CartItemsRepository {
    
    async createCartItem(cartId: string, item: IcartItems): Promise<CartItems| null> {

            const cartItem = await prisma.cartItems.create({
                data: {
                    id: v4(),
                    cartId,
                    productId: item.productId,
                    qtd: item.qtd
                }
            })
            return cartItem
        }
        

}