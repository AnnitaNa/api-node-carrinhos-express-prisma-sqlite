import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';


const prisma = new PrismaClient();


export class UserRepository {
    async getAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users
    }

    async getById(id: number): Promise<User | null> {
        const user = await this.finduser({id});
        return user
    }

    async create({userName, email, password}: Omit<User, 'id'>): Promise<User | null> {

        const hashPwd = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                userName,
                email,
                password: hashPwd
            }
        })
        return user
    
    }

    async update(id: number, {userName, email, password}:  Omit<User, 'id'>): Promise<User | null> {

        const hashPwd = await bcrypt.hash(password, 10);

        const user = await prisma.user.update({
            data: {
                userName,
                email,
                password: hashPwd
            },
            where: {
                id
            }
        })
        return user

    }

    async delete(id: number): Promise<User | null> {

        const user = await prisma.user.delete({
            where: {
                id
            }
        })

        return user
    }

    async finduser(param: Partial<User>) {

        const {id, userName, email} = param;

        const userExists = await prisma.user.findFirst({
            where: 
                {
                    id: this.isDefined(id),
                    userName: this.isDefined(userName),
                    email: this.isDefined(email)
                }
        })

        return userExists
    }

   private isDefined(T: any) {
       return  T != null ? T : undefined
       // if the property is not passed (null), it will put its value as undefined. 
       //when undefined, Prisma does nothing with it
    }
}