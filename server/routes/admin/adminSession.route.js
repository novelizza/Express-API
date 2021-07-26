import express from 'express';
import adminSessionCtrl from '../../controllers/admin_session.controller';
// import initialization from '../../misc/initialization';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/users - Get list of adminSessions */
    .get(adminSessionCtrl.list);

router.route('/:adminSessionId')

    /** GET /api/users/:userId - Get adminSessions */
    .get(adminSessionCtrl.get);

/** Load user when API with userId route parameter is hit */
router.param('adminSessionId', adminSessionCtrl.load);

export default router;
