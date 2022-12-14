import {Router, Request, Response} from 'express';
import { PrismaClient } from '@prisma/client'

export const userRoutes = Router();

const prisma = new PrismaClient();

userRoutes.get("/", async (req: Request, res: Response) => {
    const user = await prisma.user.findMany()
    res.send(user)
})

userRoutes.post("/", async (req: Request, res: Response) => {
    const {userName, password} = req.body
    const user = await prisma.user.create({
        data: {
            userName,
            password
        }
    })
    res.send(user)
})


