import express from 'express';
import expressJwt from 'express-jwt';
import authCtrl from '../../controllers/auth.controller';
import config from '../../../config/config';
import validation from '../../validations/index.validation';
import initialization from '../../misc/initialization';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * POST /api/auth/login - Returns token if correct username and password is provided
 */
router.get('/health-check', (req, res) => {
    res.send('Auth');
});

router.route('/supplier')
    .post([
        initialization.checkSetting,
        initialization.checkVersion,
        validation.authValidation.validate('loginSupplier'),
    ], authCtrl.loginSupplier)

    /** DELETE /api/users/supplier - Logout Supplier */
    .delete(initialization.checkSupplierSession, authCtrl.logoutSupplier);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header.
 * Authorization: Bearer {token}
 */
router.route('/random-number')
    .get(expressJwt({
        secret: config.jwtSecret,
    }), authCtrl.getRandomNumber);

export default router;
