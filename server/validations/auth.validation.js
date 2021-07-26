/* eslint-disable newline-per-chained-call */
/* eslint-disable max-len */
// import db from '../../config/sequelize';
import errorCodes from '../errors/index.error';

// const Platform = db.platform;

// const Sequelize = require('sequelize');
const { check } = require('express-validator');

function validate(method) {
    switch (method) {
    case 'loginAdmin': {
        return [
            check('email')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isEmail().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_EMAIL.message)),
            check('password')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
        ];
    }
    case 'loginSupplier': {
        return [
            check('email')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isEmail().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_EMAIL.message)),
            check('password')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isString().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_STRING.message)),
        ];
    }
    default: {
        return [];
    }
    }
}

export default { validate };
