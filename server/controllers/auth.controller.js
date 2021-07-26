import jwt from 'jsonwebtoken';
import moment from 'moment';
import db from '../../config/sequelize';
import errorCodes from '../errors/index.error';

const { validationResult } = require('express-validator');
const _ = require('lodash');
const crypto = require('crypto');
const {
    setContent,
    getContentSuccess,
    getContentFail,
} = require('../response/response');

// eslint-disable-next-line camelcase
const {
    admin,
    // eslint-disable-next-line camelcase
    admin_session,
    supplier,
    // eslint-disable-next-line camelcase
    supplier_session,
} = db;

async function loginAdmin(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const data = _(errors.errors)
            .groupBy('param')
            .mapValues((group) => _.map(group, 'msg'))
            .value();
        setContent(422, data);
        return res.status(422).json(getContentFail(req));
    }

    return admin.findOne({
        where: {
            email: req.body.email,
        },
    }).then(async (result) => {
        if (!result) {
            setContent(400, errorCodes.adminUSError.ADMIN_NOT_FOUND);
            return res.status(400).json(getContentFail(req));
        }
        if (result.dataValues.status === 'inactive') {
            setContent(400, errorCodes.authUSError.ACCOUNT_SUSPENDED);
            return res.status(400).json(getContentFail(req));
        }
        if (result.dataValues.password !== req.body.password) {
            setContent(400, errorCodes.authUSError.WRONG_PASSWORD);
            return res.status(400).json(getContentFail(req));
        }

        const sessionHash = crypto.createHash('sha256')
            .update(`Admin${result.dataValues.admin_id}${result.dataValues.full_name}${result.dataValues.email}${Date.now()}`)
            .digest('hex');
        const now = moment(Date.now()).tz('Asia/Jakarta').format();
        const split = req.settingData.cms_session_expiry.split(';');
        const valueExp = split[0];
        const intervalExp = split[1];
        const sessionExpiry = moment(now).add(valueExp, `${intervalExp}`).tz('Asia/Jakarta');
        const diff = sessionExpiry.diff(now) / 1000;
        return admin_session.findOrCreate({
            where: {
                admin_id: result.dataValues.admin_id,
            },
            defaults: {
                admin_id: result.dataValues.admin_id,
                session: sessionHash,
                expire_value: diff,
                expired_at: moment(sessionExpiry).tz('Asia/Jakarta').format(),
            },
        }).then(async (findCreateResult) => {
            if (findCreateResult[1] === false) {
                await admin_session.update({
                    session: sessionHash,
                    expire_value: diff,
                    expired_at: moment(sessionExpiry).tz('Asia/Jakarta').format(),
                }, {
                    where: {
                        admin_id: result.dataValues.admin_id,
                    },
                });
            }
            const token = jwt.sign({
                type: 'admin',
                name: result.dataValues.full_name,
                email: result.dataValues.email,
                session: sessionHash,
                session_expiry: moment(sessionExpiry).tz('Asia/Jakarta').format(),
                status: result.dataValues.status,
            }, process.env.JWT_SECRET, { expiresIn: diff });
            res.cookie('accessToken', token, { maxAge: diff * 1000 });
            setContent(200, {
                email: result.dataValues.email,
                session: sessionHash,
                session_expiry: moment(sessionExpiry).tz('Asia/Jakarta').format(),
                status: result.dataValues.status,
                token,
            });
            return res.status(200).json(getContentSuccess(req));
        });
    }).catch((e) => {
        setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
        return res.status(500).json(getContentFail(req, e));
    });
}

async function loginSupplier(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const data = _(errors.errors)
            .groupBy('param')
            .mapValues((group) => _.map(group, 'msg'))
            .value();
        setContent(422, data);
        return res.status(422).json(getContentFail(req));
    }

    return supplier.findOne({
        where: {
            email: req.body.email,
        },
    }).then(async (result) => {
        if (!result) {
            setContent(400, errorCodes.supplierUSError.SUPPLIER_NOT_FOUND);
            return res.status(400).json(getContentFail(req));
        }
        if (result.dataValues.status === 'inactive') {
            setContent(400, errorCodes.authUSError.ACCOUNT_SUSPENDED);
            return res.status(400).json(getContentFail(req));
        }
        if (result.dataValues.password !== req.body.password) {
            setContent(400, errorCodes.authUSError.WRONG_PASSWORD);
            return res.status(400).json(getContentFail(req));
        }

        const sessionHash = crypto.createHash('sha256')
            .update(`Supplier${result.dataValues.supplier_id}${result.dataValues.full_name}${result.dataValues.email}${Date.now()}`)
            .digest('hex');
        const now = moment(Date.now()).tz('Asia/Jakarta').format();
        const split = req.settingData.supplier_session_expiry.split(';');
        const valueExp = split[0];
        const intervalExp = split[1];
        const sessionExpiry = moment(now).add(valueExp, `${intervalExp}`).tz('Asia/Jakarta');
        const diff = sessionExpiry.diff(now) / 1000;
        return supplier_session.findOrCreate({
            where: {
                supplier_id: result.dataValues.supplier_id,
            },
            defaults: {
                supplier_id: result.dataValues.supplier_id,
                session: sessionHash,
                expire_value: diff,
                expired_at: moment(sessionExpiry).tz('Asia/Jakarta').format(),
            },
        }).then(async (findCreateResult) => {
            if (findCreateResult[1] === false) {
                await supplier_session.update({
                    session: sessionHash,
                    expire_value: diff,
                    expired_at: moment(sessionExpiry).tz('Asia/Jakarta').format(),
                }, {
                    where: {
                        supplier_id: result.dataValues.supplier_id,
                    },
                });
            }
            const token = jwt.sign({
                type: 'supplier',
                name: result.dataValues.full_name,
                email: result.dataValues.email,
                session: sessionHash,
                session_expiry: moment(sessionExpiry).tz('Asia/Jakarta').format(),
                status: result.dataValues.status,
            }, process.env.JWT_SECRET, { expiresIn: diff });
            res.cookie('accessToken', token, { maxAge: diff * 1000 });
            setContent(200, {
                email: result.dataValues.email,
                session: sessionHash,
                session_expiry: moment(sessionExpiry).tz('Asia/Jakarta').format(),
                status: result.dataValues.status,
                token,
                status_apps: req.versionData.status,
            });
            return res.status(200).json(getContentSuccess(req));
        });
    }).catch((e) => {
        setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
        return res.status(500).json(getContentFail(req, e));
    });
}

function logoutSupplier(req, res) {
    return supplier_session.destroy({
        where: {
            supplier_id: req.dataSupplier.supplier_id,
        },
    })
        .then(() => {
            setContent(200, 'OK');
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
            return res.status(500).json(getContentFail(req, e));
        });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100,
    });
}

export default {
    loginAdmin, loginSupplier, logoutSupplier, getRandomNumber,
};
