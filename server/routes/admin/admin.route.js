import express from 'express';
import adminCtrl from '../../controllers/admin.controller';
import validation from '../../validations/index.validation';
// import initialization from '../../misc/initialization';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/users - Get list of admins */
    .get(adminCtrl.list)

    /** POST /api/users - Create new admins */
    .post(validation.adminValidation.validate('createdAdmin'), adminCtrl.create);

router.route('/:adminId')

    /** GET /api/users/:adminId - Get admins */
    .get(adminCtrl.get)

    /** PUT /api/users/:adminId - Update admins */
    .put(validation.adminValidation.validate('updatedAdmin'), adminCtrl.update)

    /** DELETE /api/users/:adminId - Delete admins */
    .delete(adminCtrl.remove);

/** Load user when API with adminId route parameter is hit */
router.param('adminId', adminCtrl.load);

export default router;
