
import {Request, Response} from "express"

import { Cart } from "@prisma/client";
import { CartService } from "@services/cart.service";
import { ResponseBody } from "@presenters/index.presenter";
import { container } from "tsyringe";


export class CartController {
   
    async getAll(req: Request, res: Response) {
        const cartService = container.resolve(CartService);
        const carts: Cart[] = await cartService.getAll();
        res.send(carts)
    }

    async create(req: Request, res: Response) {
        const cartService = container.resolve(CartService);
        const cart: ResponseBody<Cart> | null = await cartService.create({...req.body})
        res.status(cart!.statusCode).json(cart?.response);
    }
}