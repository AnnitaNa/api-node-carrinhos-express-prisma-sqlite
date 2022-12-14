import { body, param } from 'express-validator';

export const productCreateValidation = [
    body('description')
        .notEmpty().withMessage("Please input a description"),
    body('price')
        .notEmpty().withMessage("Please input a price")
        .isInt().withMessage("it needs to be an integer!"),
    body('qtd')
        .notEmpty().withMessage("Please input a qtd")
        .isDecimal().withMessage("it need to be decimal"),
]

export const productIdValidation = [
    param('id')
        .notEmpty().withMessage("You must send an id at the query")
]

export const productUpdateValidation = [productIdValidation, ...productCreateValidation]