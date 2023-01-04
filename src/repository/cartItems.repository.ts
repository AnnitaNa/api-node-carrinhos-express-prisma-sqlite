import { IcartItems } from "@interfaces/IcartItems.interfaces";
import { ICartItemsRepository } from "@interfaces/ICartItemsRepository.interface";
import { CartItems, PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";

@injectable()
export class CartItemsRepository implements ICartItemsRepository {
    constructor(@inject('PrismaClient') private readonly prisma: PrismaClient){}

    async createCartItem(cartId: string, item: IcartItems): Promise<CartItems| null> {

            const cartItem = await this.prisma.cartItems.create({
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