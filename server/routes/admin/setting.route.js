import express from 'express';
import settingCtrl from '../../controllers/setting.controller';
import validation from '../../validations/index.validation';
import initialization from '../../misc/initialization';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/users - Get list of users */
    .get(initialization.checkTokenAdmin, initialization.checkSessionAdmin, settingCtrl.list)

    /** POST /api/users - Create new user */
    .post(validation.settingValidation.validate('createdSetting'), settingCtrl.create);

router.route('/:settingId')

    /** GET /api/users/:settingId - Get user */
    .get(settingCtrl.get)

    /** PUT /api/users/:settingId - Update user */
    .put(validation.settingValidation.validate('updatedSetting'), settingCtrl.update)

    /** DELETE /api/users/:settingId - Delete user */
    .delete(settingCtrl.remove);

/** Load user when API with settingId route parameter is hit */
router.param('settingId', settingCtrl.load);

export default router;
