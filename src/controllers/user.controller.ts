
import { ResponseBody } from "@presenters/index.presenter";
import { User } from "@prisma/client";
import { UserService } from "@services/user.service";
import {Request, Response} from "express"
import { container } from "tsyringe";


export class UserController {
    async getAll(req: Request, res: Response) {
        const userService = container.resolve(UserService);
        const users: User[] = await userService.getAll();
        res.send(users)
    }

    async getById(req: Request, res: Response) {
        const {id} = req.params;
        const userService = container.resolve(UserService);
        const user: ResponseBody<User> | null = await userService.getById(Number (id));

        res.status(user!.statusCode).json(user?.response)

    }

    async create(req: Request<{}, {}, Omit<User, 'id'>>, res: Response) {
        const userService = container.resolve(UserService);
        const user: ResponseBody<User> | null  = await userService.create({...req.body});

        res.status(user!.statusCode).json(user?.response);
    }

    async update(req: Request, res: Response) {
        const {id} = req.params;
        const userService = container.resolve(UserService);
        const user: ResponseBody<User> | null = await userService.update(Number (id), {...req.body});

        res.status(user!.statusCode).json(user?.response);
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params;
        const userService = container.resolve(UserService);
        const user: ResponseBody<User> | null = await userService.delete(Number (id));

        res.json(user)
    }
}