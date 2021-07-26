import express from 'express';
import supplierSessionCtrl from '../../controllers/supplier_session.controller';
import validation from '../../validations/index.validation';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/users - Get list of supplierSessions */
    .get(supplierSessionCtrl.list);

router.route('/:supplierSessionId')

    /** GET /api/users/:userId - Get supplierSessions */
    .get(supplierSessionCtrl.get)
    .put(validation.supplierSessionValidation.validate('updated_expired'), supplierSessionCtrl.update);

/** Load user when API with userId route parameter is hit */
router.param('supplierSessionId', supplierSessionCtrl.load);

export default router;
