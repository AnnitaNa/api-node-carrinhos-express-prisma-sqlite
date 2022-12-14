import { Product } from "@prisma/client";
import { ProductService} from "../services/product.service";
import {Request, Response} from "express"
import { ResponseBody } from "../presenters/index.presenter";


const productService = new ProductService();

export class ProductController {
    async getAll(req: Request, res: Response) {
        const products: Product[] = await productService.getAll();
        res.send(products)
    }

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        const product: ResponseBody<Product> | null = await productService.getById(id);

        res.status(product!.statusCode).json(product?.response)

    }

    async create(req: Request, res: Response) {
        const product: ResponseBody<Product> | null  = await productService.create({...req.body});

        res.status(product!.statusCode).json(product?.response);
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const product: ResponseBody<Product> | null = await productService.update(id, {...req.body});

        res.status(product!.statusCode).json(product?.response);
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        const product: ResponseBody<Product> | null = await productService.delete(id);

        res.json(product)
    }
}