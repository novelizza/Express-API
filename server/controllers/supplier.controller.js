import errorCodes from '../errors/index.error';
import db from '../../config/sequelize';

// const Sequelize = require('sequelize');

const Supplier = db.supplier;
const _ = require('lodash');
const { validationResult } = require('express-validator');
const { setContent, getContentSuccess, getContentFail } = require('../response/response');
const { simpleOrdering, simplePagination } = require('../misc/misc');

function loadSupplier(req, res) {
    setContent(200, req.dataSupplier);
    return res.status(200).json(getContentSuccess());
}

const create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const data = _(errors.errors)
            .groupBy('param')
            .mapValues((group) => _.map(group, 'msg'))
            .value();
        setContent(422, data);
        return res.status(422).json(getContentFail(req));
    }
    return Supplier.create(req.body)
        .then((result) => {
            setContent(200, result);
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
            return res.status(500).json(getContentFail(req, e));
        });
};

function update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const data = _(errors.errors)
            .groupBy('param')
            .mapValues((group) => _.map(group, 'msg'))
            .value();
        setContent(422, data);
        return res.status(422).json(getContentFail(req));
    }

    const { dataSupplier } = req;
    return Supplier.update({
        full_name: req.body.full_name,
        phone_number: req.body.phone_number,
        password: req.body.password,
        profile_picture: req.body.profile_picture,
        province: req.body.province,
        city: req.body.city,
        district: req.body.district,
        village: req.body.village,
        postal_code: req.body.postal_code,
    }, {
        where: {
            supplier_id: dataSupplier.supplier_id,
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

function list(req, res) {
    const ordering = simpleOrdering(req, 'supplier_id');
    const pagination = simplePagination(req);
    const option = {
        where: {
        },
        include: [],
        distinct: true,
    };
    return Supplier
        .scope([
            { method: ['ordering', ordering] },
            { method: ['pagination', req.query.pagination, pagination] },
        ])
        .findAndCountAll(option)
        .then((result) => {
            if (!result) {
                setContent(404, errorCodes.supplierUSError.SUPPLIER_NOT_FOUND);
                return res.status(404).json(getContentFail(req));
            }
            setContent(200, result);
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
            return res.status(500).json(getContentFail(req, e));
        });
}

function remove(req, res) {
    const { supplier } = req;
    return supplier.destroy()
        .then(() => {
            setContent(200, 'OK');
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(500, errorCodes.generalGEError.SOMETHING_WRONG);
            return res.status(500).json(getContentFail(req, e));
        });
}

export default {
    loadSupplier,
    create,
    update,
    list,
    remove,
};
