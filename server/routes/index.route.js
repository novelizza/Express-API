import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import adminRoutes from './admin/index.route';
import supplierRoutes from './supplier/index.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
    res.send('OK');
});

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount cms routes at /cms
router.use('/cms', adminRoutes);

// mount supplier routes at /supplier
router.use('/supplier', supplierRoutes);

export default router;
