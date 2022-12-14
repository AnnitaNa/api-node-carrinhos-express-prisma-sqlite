import {Router} from 'express';

import { productRoutes } from './products.routes';
import { userRoutes } from './users.routes';

export const routes = Router();

routes.use("/products", productRoutes);
routes.use("/users", userRoutes);


