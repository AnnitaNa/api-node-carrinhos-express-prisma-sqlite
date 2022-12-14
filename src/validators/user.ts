import { body, param } from 'express-validator';

export const userValidation = [
    body('userName').notEmpty().withMessage("Please input a userName"),
    body('password').notEmpty().withMessage("Please input a password"),
]