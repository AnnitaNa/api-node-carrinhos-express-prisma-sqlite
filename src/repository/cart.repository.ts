import { ICartRepository } from "@interfaces/ICartRepository.interface";
import { Cart, PrismaClient} from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
export class CartRepository implements ICartRepository {
    constructor(@inject('PrismaClient') private readonly prisma: PrismaClient){}

    async getAll(): Promise<Cart[]> {
        const cart = await this.prisma.cart.findMany(
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


    async createCart(id:string, total: number, userId: number): Promise<Cart | null> {

        const cart = await this.prisma.cart.create({
            data: {
                id,
                userId,
                total
            },
            include: {
                items: true
            }
        })

        return cart
    }

}