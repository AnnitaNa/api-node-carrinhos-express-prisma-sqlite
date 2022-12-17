import { PrismaClient, User } from "@prisma/client";
import bcrypt, { hash } from 'bcrypt';
import { Conflict, NotFound, OK, ResponseBody} from "../presenters/index.presenter";

const prisma = new PrismaClient();


export class UserService {
    async getAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users
    }

    async getById(id: number): Promise<ResponseBody<User> | null> {
        const user = await this.finduser({id});

        if (!user) return new NotFound();

        return new OK(user)
    }

    async create({userName, email, password}: Omit<User, 'id'>): Promise<ResponseBody<User> | null> {

        const userExists = await this.finduser({userName, email});

        if (userExists) return new Conflict("There is already a user with this userName or email")
        
        const hashPwd = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                userName,
                email,
                password: hashPwd
            }
        })
        return new OK(user)
    
    }

    async update(id: number, {userName, email, password}:  Omit<User, 'id'>): Promise<ResponseBody<User> | null> {
        
        const userExists = await this.finduser({id});
        if (!userExists) return new NotFound();

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
        return new OK(user)

    }

    async delete(id: number): Promise<ResponseBody<User> | null> {
        const user = await prisma.user.delete({
            where: {
                id
            }
        })

        return new OK(user)
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