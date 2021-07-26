/* eslint-disable newline-per-chained-call */
/* eslint-disable max-len */
// import db from '../../config/sequelize';
import errorCodes from '../errors/index.error';

// const User = db.user;

// const Sequelize = require('sequelize');
const { check } = require('express-validator');

function validate(method) {
    switch (method) {
    case 'createdBrand': {
        return [
            check('name')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('email')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isEmail().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_EMAIL.message)),
            check('password')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('status')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isIn(['active', 'inactive']).withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_ENUM.message)),
        ];
    }

    case 'updatedBrand': {
        return [
            check('name')
                .optional().isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('email')
                .optional().isEmail().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_EMAIL.message)),
            check('password')
                .optional().isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
            check('status')
                .optional().isIn(['active', 'inactive']).withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_ENUM.message)),
        ];
    }

    default: {
        return [];
    }
    }
}

export default { validate };
