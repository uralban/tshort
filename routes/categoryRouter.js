const categoryRouter = require('express').Router();
const { CategoryController } = require('../controllers/CategoryController');

categoryRouter.post('/', CategoryController.showCategory);

categoryRouter.use((req, res) => {
    res.status(404).json({message: 'Wrong request'});
  });

module.exports = categoryRouter;