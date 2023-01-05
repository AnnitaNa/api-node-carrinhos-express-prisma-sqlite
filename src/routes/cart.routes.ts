
import { CartController } from "@controllers/cart.controller";
import { CartService } from "@services/cart.service";
import { Router } from "express";
import { container } from "tsyringe";


export const cartRoutes = Router();

const cartController = container.resolve(CartController)

//preciso desse bind para que ele reconheça que o this do construtor do CartController se refere ao CartController (o this se perde na rota)
cartRoutes.get('/', cartController.getAll.bind(cartController))
cartRoutes.post('/', cartController.create.bind(cartController))