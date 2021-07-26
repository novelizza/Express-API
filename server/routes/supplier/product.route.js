import express from 'express';
import productCtrl from '../../controllers/product.controller';
import validation from '../../validations/index.validation';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/products - Get list of products */
    .get(productCtrl.list)

    /** POST /api/products - Create new product */
    .post(validation.productValidation.validate('createProduct'), productCtrl.create);

router.route('/:productId')

    /** GET /api/products/:productId - Get product */
    .get(productCtrl.get)

    /** PUT /api/products/:productId - Update product */
    .put(productCtrl.update)

    /** DELETE /api/products/:productId - Delete product */
    .delete(productCtrl.remove);

/** Load product when API with productId route parameter is hit */
router.param('productId', productCtrl.load);

export default router;
