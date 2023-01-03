
import {Router} from 'express';

import { ProductController } from '@controllers/product.controller';
import { productCreateValidation, productIdValidation, productUpdateValidation } from '@validators/product';
import { validatesRequest } from '@middlewares/ValidatesRequest';

const productController = new ProductController();

export const productRoutes = Router();

productRoutes.get("/", productController.getAll)
productRoutes.get("/:id", productIdValidation, validatesRequest, productController.getById)
productRoutes.post("/", productCreateValidation, validatesRequest, productController.create)
productRoutes.put("/:id", productUpdateValidation, validatesRequest, productController.update)
productRoutes.delete("/:id", productIdValidation, validatesRequest, productController.delete)




