import express from 'express';
import versionCtrl from '../../controllers/version.controller';
import validation from '../../validations/index.validation';
// import initialization from '../../misc/initialization';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/users - Get list of users */
    .get(versionCtrl.list)

    /** POST /api/users - Create new user */
    .post(validation.userValidation.validate('createUser'), versionCtrl.create);

router.route('/:versionId')

    /** GET /api/users/:versionId - Get user */
    .get(versionCtrl.get)

    /** PUT /api/users/:versionId - Update user */
    .put(versionCtrl.update)

    /** DELETE /api/users/:versionId - Delete user */
    .delete(versionCtrl.remove);

/** Load user when API with versionId route parameter is hit */
router.param('versionId', versionCtrl.load);

export default router;
