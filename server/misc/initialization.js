// import jwt from 'express-jwt';
import moment from 'moment';
import db from '../../config/sequelize';
import { setContent, getContentFail } from '../response/response';
import errorCodes from '../errors/index.error';

const jwt = require('jsonwebtoken');

const {
    setting,
    version,
    // eslint-disable-next-line camelcase
    admin_session,
    // eslint-disable-next-line camelcase
    supplier_session,
    supplier,
} = db;

const checkSetting = async (req, res, next) => {
    let settingError = false;
    let settingErrorData = null;
    let settingData = null;
    await setting.findByPk(1)
        .then((result) => {
            if (result) {
                settingData = result.dataValues;
            }
        }).catch((e) => {
            settingError = true;
            settingErrorData = e;
        });
    if (settingError) {
        setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
        return res.status(500).json(getContentFail(req, settingErrorData));
    }
    if (!settingData) {
        setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
        return res.status(500).json(getContentFail(req, settingData));
    }
    req.settingData = settingData;
    return next();
};

const checkVersion = async (req, res, next) => {
    const error = 'HEADER_ERROR';
    let versionData = null;
    if (req.headers.os === 'android' || req.headers.os === 'ios') {
        if (req.headers.version === undefined) {
            setContent(400, errorCodes.versionUSError.VERSION_NOT_FOUND);
            return res.status(400).json(getContentFail(req, error));
        }
        await version.findOne({
            where: {
                os: req.headers.os,
                version: req.headers.version,
            },
        }).then((result) => {
            if (result) {
                versionData = result;
            }
        }).catch((e) => {
            setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
            return res.status(500).json(getContentFail(req, e));
        });
        if (!versionData) {
            setContent(400, errorCodes.versionUSError.VERSION_NOT_FOUND);
            return res.status(400).json(getContentFail(req, versionData));
        }
        if (versionData.os === 'android' && req.settingData.android_is_maintenance === true) {
            setContent(400, errorCodes.versionUSError.MAINTENANCE);
            return res.status(400).json(getContentFail(req, versionData));
        }
        if (versionData.os === 'ios' && req.settingData.ios_is_maintenance === true) {
            setContent(400, errorCodes.versionUSError.MAINTENANCE);
            return res.status(400).json(getContentFail(req, versionData));
        }
        req.versionData = versionData;
        return next();
    }
    setContent(400, errorCodes.versionUSError.OS_NOT_FOUND);
    return res.status(400).json(getContentFail(req, error));
};

const checkTokenAdmin = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const jwtToken = req.headers.authorization.split(' ')[1];
        return jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                Object.assign(errorCodes.authUSError.NOT_AUTHORIZED, {
                    detail: err.name,
                });
                setContent(401, errorCodes.authUSError.NOT_AUTHORIZED);
                return res.status(401).json(getContentFail(req));
            }
            if (!decoded.session) {
                setContent(401, errorCodes.authUSError.NOT_AUTHORIZED);
                return res.status(401).json(getContentFail(req));
            }
            req.decoded = decoded;
            return next();
        });
    }
    setContent(401, errorCodes.authUSError.NOT_AUTHORIZED);
    return res.status(401).json(getContentFail(req));
};

const checkSessionAdmin = async (req, res, next) => {
    let sessionError = false;
    let sessionErrorData = null;
    let sessionData = null;
    let sessionExpired = null;
    const now = moment(Date.now()).tz('Asia/Jakarta').format();
    await admin_session.findOne({
        where: {
            session: req.decoded.session,
        },
    }).then((result) => {
        if (result.expired_at < moment(now)) {
            sessionExpired = true;
        }
        if (result) {
            sessionData = result;
        }
    }).catch((e) => {
        sessionError = true;
        sessionErrorData = e;
    });
    if (sessionError) {
        setContent(500, errorCodes.adminSessionUSError.ADMIN_SESSION_NOT_FOUND);
        return res.status(500).json(getContentFail(req, sessionErrorData));
    }
    if (sessionExpired) {
        setContent(401, errorCodes.authUSError.NOT_AUTHORIZED);
        return res.status(401).json(getContentFail(req, sessionErrorData));
    }
    if (!sessionData) {
        setContent(400, errorCodes.adminSessionUSError.ADMIN_SESSION_NOT_FOUND);
        return res.status(400).json(getContentFail(req, sessionData));
    }
    req.sessionData = sessionData;
    return next();
};

const checkTokenSupplier = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const jwtToken = req.headers.authorization.split(' ')[1];
        return jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                Object.assign(errorCodes.authUSError.NOT_AUTHORIZED, {
                    detail: err.name,
                });
                setContent(401, errorCodes.authUSError.NOT_AUTHORIZED);
                return res.status(401).json(getContentFail(req));
            }
            if (!decoded.session) {
                setContent(401, errorCodes.authUSError.NOT_AUTHORIZED);
                return res.status(401).json(getContentFail(req));
            }
            req.decoded = decoded;
            return next();
        });
    }
    setContent(401, errorCodes.authUSError.NOT_AUTHORIZED);
    return res.status(401).json(getContentFail(req));
};

const checkSessionSupplier = async (req, res, next) => {
    let sessionError = false;
    let sessionErrorData = null;
    let sessionData = null;
    let sessionExpired = null;
    const now = moment(Date.now()).tz('Asia/Jakarta').format();
    await supplier_session.findOne({
        where: {
            session: req.decoded.session,
        },
    }).then((result) => {
        if (result.expired_at < moment(now)) {
            sessionExpired = true;
        }
        if (result) {
            sessionData = result;
        }
    }).catch((e) => {
        sessionError = true;
        sessionErrorData = e;
    });
    if (sessionError) {
        setContent(500, errorCodes.supplierSessionUSError.SUPPLIER_SESSION_NOT_FOUND);
        return res.status(500).json(getContentFail(req, sessionErrorData));
    }
    if (sessionExpired) {
        setContent(401, errorCodes.authUSError.NOT_AUTHORIZED);
        return res.status(401).json(getContentFail(req, sessionErrorData));
    }
    if (!sessionData) {
        setContent(400, errorCodes.supplierSessionUSError.SUPPLIER_SESSION_NOT_FOUND);
        return res.status(400).json(getContentFail(req, sessionData));
    }
    req.sessionData = sessionData;
    return next();
};

const checkSupplierSession = async (req, res, next) => {
    let data;
    if (req.query.session) {
        data = req.query.session;
    }
    if (req.body.session) {
        data = req.body.session;
    }
    if (req.headers.session) {
        data = req.headers.session;
    }
    return supplier_session
        .findOne({
            where: {
                session: data,
            },
            raw: true,
        })
        .then((result) => supplier
            .findOne({
                where: {
                    supplier_id: result.supplier_id,
                },
                raw: true,
            })
            .then((resultSupplier) => {
                if (!resultSupplier) {
                    setContent(404, errorCodes.supplierUSError.SUPPLIER_NOT_FOUND);
                    return res.status(404).json(getContentFail(req));
                }
                req.dataSupplier = resultSupplier;
                return next();
            })
            .catch((e) => {
                setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
                return res.status(500).json(getContentFail(req, e));
            }))
        .catch((e) => {
            setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
            return res.status(500).json(getContentFail(req, e));
        });
};

export default {
    checkSetting,
    checkVersion,
    checkSessionAdmin,
    checkTokenAdmin,
    checkSessionSupplier,
    checkTokenSupplier,
    checkSupplierSession,
};
