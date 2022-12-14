import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";

import { Conflict, NotFound, OK, ResponseBody} from "../presenters/index.presenter";

interface IcartItems {
    productId: string,
    qtd: number
}

interface Icart {
    userId: number,
    items: IcartItems[]
}

const prisma = new PrismaClient();

export class CartService {
    async getAll() {
        const cart = await prisma.cart.findMany(
            {include: {
                items: true
            }}
        );
        return cart
    }

    async create({userId, items}: Icart) {
        const cartId = v4();
        console.log(userId, items)

        const cart = await prisma.cart.create({
            data: {
                id: cartId,
                userId,
                total: 10
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
            })
        }
        return new OK()
    }
}