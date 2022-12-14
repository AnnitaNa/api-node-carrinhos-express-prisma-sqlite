import { CartService } from "../services/cart.service";
import {Request, Response} from "express"
import { ResponseBody } from "../presenters/index.presenter";

const cartService = new CartService();

export class CartController {
    async getAll(req: Request, res: Response) {
        const carts = await cartService.getAll();
        res.send(carts)
    }

    async create(req: Request, res: Response) {
        const cart = await cartService.create({...req.body})
        res.send(cart)
    }
}