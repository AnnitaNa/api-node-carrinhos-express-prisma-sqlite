import { body, param } from 'express-validator';

export const userValidation = [
    body('userName').notEmpty().withMessage("Please input a userName"),
    body('email').notEmpty().withMessage("Please input a email"),
    body('password').notEmpty().withMessage("Please input a password"),
]