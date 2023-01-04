import { User } from "@prisma/client";
import { BadRequest, Conflict, NotFound, OK, ResponseBody} from "@presenters/index.presenter";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@interfaces/IUserRepository.interface";

@injectable()
export class UserService {

    constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

    async getAll(): Promise<User[]> {
        const users = await this.userRepository.getAll();
        return users
    }

    async getById(id: number): Promise<ResponseBody<User> | null> {
        const user = await this.userRepository.getById(id);
        if (!user) return new NotFound();

        return new OK(user)
    }

    async create({userName, email, password}: Omit<User, 'id'>): Promise<ResponseBody<User> | null> {

        const userExists = await this.userRepository.finduser({userName, email});
        if (userExists) return new Conflict("There is already a user with this userName or email");

        const user = await this.userRepository.create({userName, email, password});
        if (!user) return new BadRequest();

        return new OK(user)
    
    }

    async update(id: number, {userName, email, password}:  Omit<User, 'id'>): Promise<ResponseBody<User> | null> {
        
        const userExists = await this.userRepository.finduser({id});
        if (!userExists) return new NotFound();

        const user = await this.userRepository.update(id, {userName, email, password});
        if (!user) return new BadRequest();

        return new OK(user)

    }

    async delete(id: number): Promise<ResponseBody<User> | null> {

        const userExists = await this.userRepository.finduser({id});
        if (!userExists) return new NotFound("User not found");

        const user = await this.userRepository.delete(id);
        if (!user) return new BadRequest();

        return new OK(user)
    }

}