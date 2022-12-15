import { Cart, PrismaClient, Product } from "@prisma/client";
import { v4 } from "uuid";
import { Icart } from "../interfaces/Icart.interface";
import { IcartItems } from "../interfaces/IcartItems.interfaces";

import { Conflict, NotFound, OK, ResponseBody} from "../presenters/index.presenter";


const prisma = new PrismaClient();

export class CartService {
    async getAll(): Promise<Cart[]> {
        const cart = await prisma.cart.findMany(
            {
                select: {
                    id: true,
                    userId: true,
                    total: true,
                    items: {
                        select: {
                            product: {
                                select: {
                                    description: true,
                                    brand: true,
                                    price: true
                                }
                            },
                            qtd: true
                        }

                    }
                }
            }
        );
        return cart
    }


    async create({userId, items}: Icart): Promise<ResponseBody<Cart> | null> {
        const cartId = v4();

        const totalValue = await this.totalValue(items)

        const cart = await prisma.cart.create({
            data: {
                id: cartId,
                userId,
                total: totalValue
            },
            include: {
                items: true
            }
        })

        for (let item of items) {
            const cartItem = await prisma.cartItems.create({
                data: {
                    id: v4(),
                    cartId,
                    productId: item.productId,
                    qtd: item.qtd
                }
            }
            
            )
        }
        return new OK(cart)
    }

    
    async totalValue(items: IcartItems[]) {
        let valueByProduct =  await Promise.all(
         items.map(async (item) => {
             let product = await prisma.product.findFirst({
                 where: 
                     {
                         id: item.productId
                     }})
             return (Number(product?.price) * item.qtd)
          })
          
        ) 
        const totalValue = valueByProduct.reduce((cur, sum) => cur+sum);
 
        return totalValue
     }
}