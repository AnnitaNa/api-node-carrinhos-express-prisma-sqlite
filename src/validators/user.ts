import { body, param } from 'express-validator';

export const userCreateValidation = [
    body('userName')
        .notEmpty().withMessage("Please input a userName"),
    body('email')
        .notEmpty().withMessage("Please input a email")
        .isEmail().withMessage("please input a valid email"),
    body('password')
        .notEmpty().withMessage("Please input a password"),
]

export const userIdValidation = [
    param('id')
        .notEmpty().withMessage("You must send an id at the query")
]

export const userUpdateValidation = [...userCreateValidation, ...userIdValidation]