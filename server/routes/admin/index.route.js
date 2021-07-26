import express from 'express';
// import userRoutes from './user.route';
import authRoutes from './auth.route';
import settingRoutes from './setting.route';
import adminRoutes from './admin.route';
import adminSessionRoutes from './adminSession.route';
import adminRoleRoutes from './adminRole.route';
import versionRoutes from './version.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (_req, res) => {
    res.send('Admin');
});

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount auth routes at /setting
router.use('/setting', settingRoutes);

// mount auth routes at /admin
router.use('/admin', adminRoutes);

// mount auth routes at /admin_session
router.use('/adminSession', adminSessionRoutes);

// mount auth routes at /admin_role
router.use('/adminRole', adminRoleRoutes);

// mount auth routes at /version_routes
router.use('/version', versionRoutes);

export default router;
