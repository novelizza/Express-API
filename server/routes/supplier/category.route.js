import express from 'express';
import categoryCtrl from '../../controllers/category.controller';
import validation from '../../validations/index.validation';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/categorys - Get list of categorys */
    .get(categoryCtrl.list)

    /** POST /api/categorys - Create new category */
    .post(validation.categoryValidation.validate('createCategory'), categoryCtrl.create);

router.route('/:categoryId')

    /** GET /api/categorys/:categoryId - Get category */
    .get(categoryCtrl.get)

    /** PUT /api/categorys/:categoryId - Update category */
    .put(categoryCtrl.update)

    /** DELETE /api/categorys/:categoryId - Delete category */
    .delete(categoryCtrl.remove);

/** Load category when API with categoryId route parameter is hit */
router.param('categoryId', categoryCtrl.load);

export default router;
