import { PrismaClient} from "@prisma/client";
import { IcartItems } from "../interfaces/IcartItems.interfaces";

const prisma = new PrismaClient();

export class ProductRepository {

    async findProduct(item: IcartItems) {
        let product = await prisma.product.findFirst({
            where: 
                {
                    id: item.productId
                }})
        return product
    }
}