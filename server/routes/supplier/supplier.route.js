import express from 'express';
import supplierCtrl from '../../controllers/supplier.controller';
import validation from '../../validations/index.validation';
import initialization from '../../misc/initialization';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/users/:userId - Get suppliers */
    .get(initialization.checkSupplierSession, supplierCtrl.loadSupplier)

    /** PUT /api/users/:userId - Update suppliers */
    .put(validation.supplierValidation.validate('updatedSupplier'), initialization.checkSupplierSession, supplierCtrl.update)

    /** DELETE /api/users/:userId - Delete suppliers */
    .delete(initialization.checkSupplierSession, supplierCtrl.remove);

/** POST /api/users - Create new suppliers
    .post(validation.supplierValidation.validate('createdSupplier'), supplierCtrl.create); */

// router.route('/:supplierId')

/** Load user when API with userId route parameter is hit */
// router.param('supplierId', supplierCtrl.load);

export default router;
