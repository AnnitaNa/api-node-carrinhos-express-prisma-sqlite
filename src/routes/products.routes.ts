import {Router} from 'express';
import { ProductController } from '../controllers/product.controller';
import { validatesRequest } from '../middlewares/ValidatesRequest';
import {productCreateValidation, productIdValidation, productUpdateValidation} from '../validators/product';



const productController = new ProductController();

export const productRoutes = Router();

productRoutes.get("/", productController.getAll)
productRoutes.get("/:id", productIdValidation, validatesRequest, productController.getById)
productRoutes.post("/", productCreateValidation, validatesRequest, productController.create)
productRoutes.put("/:id", productCreateValidation, validatesRequest, productController.update)
productRoutes.delete("/:id", productIdValidation, validatesRequest, productController.delete)




