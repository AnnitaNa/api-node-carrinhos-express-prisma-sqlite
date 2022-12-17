import {Router} from 'express';
import { UserController } from '../controllers/user.controller';
import { userCreateValidation, userIdValidation, userUpdateValidation } from '../validators/user';
import { validatesRequest } from '../middlewares/ValidatesRequest';

export const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userController.getAll)
userRoutes.get("/:id", userIdValidation, validatesRequest, userController.getById)
userRoutes.post("/", userCreateValidation, validatesRequest, userController.create)
userRoutes.put("/:id", userUpdateValidation, validatesRequest, userController.update)
userRoutes.delete("/:id", userIdValidation, validatesRequest, userController.delete)


