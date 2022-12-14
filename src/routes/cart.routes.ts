import { Router } from "express";
import { CartController } from "../controllers/cart.controller";

export const cartRoutes = Router();

const cartController = new CartController();

cartRoutes.get('/', cartController.getAll)
cartRoutes.post('/', cartController.create)