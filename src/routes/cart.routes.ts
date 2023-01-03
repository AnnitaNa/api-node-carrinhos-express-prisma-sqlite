
import { CartController } from "@controllers/cart.controller";
import { Router } from "express";


export const cartRoutes = Router();

const cartController = new CartController();

cartRoutes.get('/', cartController.getAll)
cartRoutes.post('/', cartController.create)