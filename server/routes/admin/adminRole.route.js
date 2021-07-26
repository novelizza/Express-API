import express from 'express';
import adminRoleCtrl from '../../controllers/admin_role.controller';
import validation from '../../validations/index.validation';
// import initialization from '../../misc/initialization';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/users - Get list of adminRoles */
    .get(adminRoleCtrl.list)

    /** POST /api/users - Create new adminRoles */
    .post(validation.userValidation.validate('createUser'), adminRoleCtrl.create);

router.route('/:adminRoleId')

    /** GET /api/users/:adminRoleId - Get adminRoles */
    .get(adminRoleCtrl.get)

    /** PUT /api/users/:adminRoleId - Update adminRoles */
    .put(adminRoleCtrl.update)

    /** DELETE /api/users/:adminRoleId - Delete adminRoles */
    .delete(adminRoleCtrl.remove);

/** Load user when API with adminRoleId route parameter is hit */
router.param('adminRoleId', adminRoleCtrl.load);

export default router;
