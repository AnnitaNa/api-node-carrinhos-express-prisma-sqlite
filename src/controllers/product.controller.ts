import { ResponseBody } from "@presenters/index.presenter";
import { Product } from "@prisma/client";
import { ProductService } from "@services/product.service";
import {Request, Response} from "express"



const productService = new ProductService();

export class ProductController {
    async getAll(req: Request, res: Response) {
        const products: Product[] = await productService.getAll();
        res.send(products)
    }

    async getById(req: Request<{id: string}>, res: Response) {
        const {id} = req.params;
        const product: ResponseBody<Product> | null = await productService.getById(id);

        res.status(product!.statusCode).json(product?.response)

    }

    async create(req: Request<{}, {}, Omit<Product, 'id'>>, res: Response) {
        const product: ResponseBody<Product> | null  = await productService.create({...req.body});

        res.status(product!.statusCode).json(product?.response);
    }

    async update(req: Request<{id: string}, {}, Omit<Product, 'id'>>, res: Response) {
        const {id} = req.params;
        const product: ResponseBody<Product> | null = await productService.update(id, {...req.body});

        res.status(product!.statusCode).json(product?.response);
    }

    async delete(req: Request<{id: string}>, res: Response) {
        const {id} = req.params;
        const product: ResponseBody<Product> | null = await productService.delete(id);

        res.status(product!.statusCode).json(product);
    }
}