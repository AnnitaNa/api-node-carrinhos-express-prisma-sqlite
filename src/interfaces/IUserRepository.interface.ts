import { User } from "@prisma/client";

export interface IUserRepository {
    getAll(): Promise<User[]>,
    getById(id: number): Promise<User | null>,
    create({userName, email, password}: Omit<User, 'id'>): Promise<User | null>,
    update(id: number, {userName, email, password}:  Omit<User, 'id'>): Promise<User | null>,
    delete(id: number): Promise<User | null>,
    finduser(param: Partial<User>): Promise<User | null>
}