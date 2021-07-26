import express from 'express';
import brandCtrl from '../../controllers/brand.controller';
import validation from '../../validations/index.validation';

const router = express.Router(); // eslint-disable-line new-cap

router.get('/health-check', (req, res) => {
    res.send('Supplier');
});

router.route('/')

    /** GET /api/brands - Get list of brands */
    .get(brandCtrl.list)

    /** POST /api/brands - Create new brand */
    .post(validation.brandValidation.validate('createBrand'), brandCtrl.create);

router.route('/:brandId')

    /** GET /api/brands/:brandId - Get brand */
    .get(brandCtrl.get)

    /** PUT /api/brands/:brandId - Update brand */
    .put(brandCtrl.update)

    /** DELETE /api/brands/:brandId - Delete brand */
    .delete(brandCtrl.remove);

/** Load brand when API with brandId route parameter is hit */
router.param('brandId', brandCtrl.load);

export default router;
