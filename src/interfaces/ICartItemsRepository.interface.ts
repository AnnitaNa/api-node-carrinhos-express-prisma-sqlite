import { CartItems } from "@prisma/client";
import { IcartItems } from "./IcartItems.interfaces";

export interface ICartItemsRepository {
    createCartItem(cartId: string, item: IcartItems): Promise<CartItems| null>
}