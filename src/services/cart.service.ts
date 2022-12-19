import { Cart} from "@prisma/client";
import { v4 } from "uuid";

import { Icart } from "../interfaces/Icart.interface";
import { IcartItems } from "../interfaces/IcartItems.interfaces";
import { InternalServerError, OK, ResponseBody} from "../presenters/index.presenter";
import { CartRepository } from "../repository/cart.repository";
import { CartItemsRepository } from "../repository/cartItems.repository";
import { ProductRepository } from "../repository/product.repository";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const cartItemsRepository = new CartItemsRepository();

export class CartService {

    async getAll(): Promise<Cart[]> {
        const cart = await cartRepository.getAll();
        return cart
    }


    async create({userId, items}: Icart): Promise<ResponseBody<Cart> | null> {
        const cartId = v4();

        const totalValue = await this.totalValue(items)

        const cart = await cartRepository.createCart(cartId, totalValue, userId);
        if(!cart) return new InternalServerError();

        for (let item of items) {
            const cartItem = await cartItemsRepository.createCartItem(cartId, item);
        }
        return new OK(cart)
    }

    
    async totalValue(items: IcartItems[]) {
        let valueByProduct =  await Promise.all(
         items.map(async (item) => {
             let product = await productRepository.findProduct({id: item.productId})
             return (Number(product?.price) * item.qtd)
          })
          
        ) 
        const totalValue = valueByProduct.reduce((cur, sum) => cur+sum);
 
        return totalValue
     }
}