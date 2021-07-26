/* eslint-disable newline-per-chained-call */
/* eslint-disable max-len */
// import db from '../../config/sequelize';
import errorCodes from '../errors/index.error';

// const User = db.user;

// const Sequelize = require('sequelize');
const { check } = require('express-validator');

function validate(method) {
    switch (method) {
    case 'createdProduct': {
        return [
            check('brand_id')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('supplier_id')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('product_number')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('sku')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('name')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('price')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('markup_price')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('quantity')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('is_discount')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isBoolean().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_BOOLEAN.message)),
            check('discount')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('is_warranty')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isBoolean().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_BOOLEAN.message)),
            check('warranty_expire_date')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('warranty_for')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('description')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('status')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isIn(['Ready', 'Soldout']).withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_ENUM.message)),
            check('category_id')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
        ];
    }

    case 'updatedProduct': {
        return [
            check('name')
                .optional().isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('price')
                .optional().isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('markup_price')
                .optional().isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('quantity')
                .optional().isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
            check('is_discount')
                .optional().isBoolean().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_BOOLEAN.message)),
            check('discount')
                .optional().isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('is_warranty')
                .optional().isBoolean().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_BOOLEAN.message)),
            check('warranty_expire_date')
                .optional().isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('description')
                .optional().isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('status')
                .optional().isIn(['Ready', 'Soldout']).withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_ENUM.message)),
            check('category_id')
                .optional().isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
        ];
    }

    default: {
        return [];
    }
    }
}

export default { validate };
