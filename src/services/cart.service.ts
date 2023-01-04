import { Icart } from "@interfaces/Icart.interface";
import { IcartItems } from "@interfaces/IcartItems.interfaces";
import { ICartItemsRepository } from "@interfaces/ICartItemsRepository.interface";
import { ICartRepository } from "@interfaces/ICartRepository.interface";
import { IProductRepository } from "@interfaces/IProductRepository.interface";
import { IUserRepository } from "@interfaces/IUserRepository.interface";
import { InternalServerError, NotFound, OK, ResponseBody } from "@presenters/index.presenter";
import { Cart} from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";


@injectable()
export class CartService {

    constructor(
        @inject('ProductRepository') private productRepository: IProductRepository,
        @inject('CartRepository') private cartRepository: ICartRepository,
        @inject('CartItemsRepository') private cartItemsRepository: ICartItemsRepository,
        @inject('UserRepository') private userRepository: IUserRepository
    ){}
    
    async getAll(): Promise<Cart[]> {
        const cart = await this.cartRepository.getAll();
        return cart
    }


    async create({userId, items}: Icart): Promise<ResponseBody<Cart> | null> {
        const cartId = v4();

        const user = await this.userRepository.finduser({id: userId})
        if(!user) return new NotFound("User not found")

        const totalValue = await this.totalValue(items)

        const cart = await this.cartRepository.createCart(cartId, totalValue, userId);
        if(!cart) return new InternalServerError();

        for (let item of items) {
            const cartItem = await this.cartItemsRepository.createCartItem(cartId, item);
        }
        return new OK(cart)
    }

    
    async totalValue(items: IcartItems[]) {
        let valueByProduct =  await Promise.all(
         items.map(async (item) => {
             let product = await this.productRepository.findProduct({id: item.productId})
             return (Number(product?.price) * item.qtd)
          })
          
        ) 
        const totalValue = valueByProduct.reduce((cur, sum) => cur+sum);
 
        return totalValue
     }
}