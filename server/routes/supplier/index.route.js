import express from 'express';
import supplierRoutes from './supplier.route';
import authRoutes from './auth.route';
import supplierSessionRoutes from './supplierSession.route';
import settingRoutes from './setting.route';
import categoryRoutes from './category.route';
import productRoutes from './product.route';
import brandRoutes from './brand.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
    res.send('Supplier');
});

// mount user routes at /users
router.use('/supplier', supplierRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount auth routes at /supplierSession
router.use('/supplierSession', supplierSessionRoutes);

// mount auth routes at /setting
router.use('/setting', settingRoutes);

// mount auth routes at /category
router.use('/category', categoryRoutes);

// mount auth routes at /product
router.use('/product', productRoutes);

// mount auth routes at /brand
router.use('/brand', brandRoutes);


export default router;
