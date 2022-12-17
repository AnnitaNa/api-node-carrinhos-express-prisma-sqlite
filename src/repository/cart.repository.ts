import { Cart, PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export class CartRepository {
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


    async createCart(id:string, total: number, userId: number): Promise<Cart | null> {

        const cart = await prisma.cart.create({
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