/* eslint-disable newline-per-chained-call */
/* eslint-disable max-len */
// import db from '../../config/sequelize';
import errorCodes from '../errors/index.error';

// const User = db.user;

// const Sequelize = require('sequelize');
const { check } = require('express-validator');

function validate(method) {
    switch (method) {
    case 'updated_expired': {
        return [
            check('expired_at')
                .not().isEmpty().withMessage((value, { req }) => req.t(errorCodes.validationVLError.REQUIRED.message))
                .isNumeric().withMessage((value, { req }) => req.t(errorCodes.validationVLError.MUST_BE_INTEGER.message)),
        ];
    }

    default: {
        return [];
    }
    }
}

export default { validate };
