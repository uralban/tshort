const orderRouter = require('express').Router();
const { OrderController } = require('../controllers/OrderController');

orderRouter.post('/new', OrderController.newOrder);
orderRouter.post('/showOrdersList', OrderController.ordersList);
orderRouter.post('/showOrder', OrderController.singleOrder);

orderRouter.use((req, res) => {
    res.status(404).json({message: 'Wrong request'});
  });

module.exports = orderRouter;