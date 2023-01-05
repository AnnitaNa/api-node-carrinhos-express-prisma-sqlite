import 'reflect-metadata';
import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '@repository/product.repository';
import { ProductService } from '@services/product.service';
import { CartService, ICartService } from '@services/cart.service';
import { IProductRepository } from '@interfaces/IProductRepository.interface';
import { UserRepository } from '@repository/user.repository';
import { IUserRepository } from '@interfaces/IUserRepository.interface';
import { UserService } from '@services/user.service';
import { ICartRepository } from '@interfaces/ICartRepository.interface';
import { CartRepository } from '@repository/cart.repository';
import { ICartItemsRepository } from '@interfaces/ICartItemsRepository.interface';
import { CartItemsRepository } from '@repository/cartItems.repository';
import { CartController } from '@controllers/cart.controller';


container.register<PrismaClient>('PrismaClient', {
  useValue: new PrismaClient(),
});

// Repositories
container.register<IProductRepository>('ProductRepository', ProductRepository);
container.register<IUserRepository>('UserRepository', UserRepository);
container.register<ICartRepository>('CartRepository', CartRepository);
container.register<ICartItemsRepository>('CartItemsRepository', CartItemsRepository);

//services
container.register('ProductService', ProductService);
container.register<ICartService>('CartService', CartService);
container.register('UserService', UserService);

//controller
container.register('CartController', CartController);