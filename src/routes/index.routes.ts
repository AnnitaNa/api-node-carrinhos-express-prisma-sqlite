import {Router} from 'express';

import { cartRoutes } from './cart.routes';
import { productRoutes } from './products.routes';
import { userRoutes } from './users.routes';

export const routes = Router();

routes.use("/products", productRoutes);
routes.use("/users", userRoutes);
routes.use("/cart", cartRoutes);


