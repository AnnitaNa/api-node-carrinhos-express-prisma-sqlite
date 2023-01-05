import {Request, Response} from "express"

import { Cart } from "@prisma/client";
import { CartService, ICartService } from "@services/cart.service";
import { ResponseBody } from "@presenters/index.presenter";
import { container, inject, injectable } from "tsyringe";


@injectable()
export class CartController {
   
    constructor(@inject('CartService') private cartService: ICartService) {
       this.cartService = container.resolve(CartService)
    }

    async getAll(req: Request, res: Response) {
        //const cartService = container.resolve(CartService);
        const carts: Cart[] = await this.cartService.getAll();
        res.send(carts)
    }

    async create(req: Request, res: Response) {
        //const cartService = container.resolve(CartService);
        const cart: ResponseBody<Cart> | null = await this.cartService.create({...req.body})
        res.status(cart!.statusCode).json(cart?.response);
    }
}