const itemRouter = require('express').Router();
const { ItemController } = require('../controllers/ItemController');

itemRouter.post('/', ItemController.showItem);

itemRouter.use((req, res) => {
    res.status(404).json({message: 'Wrong request'});
  });

module.exports = itemRouter;