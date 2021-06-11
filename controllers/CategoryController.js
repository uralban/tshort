const CategoryModel = require('../models/CategoryModel');

class CategoryController {
    showCategory(req, res) {

        const { category } = req.body;

        CategoryModel.getData(category, result => {
            const { msg, status } = result;

            res.status(status).json({message: msg});
        });

    }
}

exports.CategoryController = new CategoryController();