const cartRouter = require('express').Router();
const { CartController } = require('../controllers/CartController');

cartRouter.post('/add', CartController.addToCart);
cartRouter.post('/show', CartController.showCart);
cartRouter.post('/topBar', CartController.topBarItems);
cartRouter.post('/showForCheckout', CartController.showForCheckout);
cartRouter.post('/addOne', CartController.addOneItem);
cartRouter.post('/removeOne', CartController.removeOneItem);

cartRouter.use((req, res) => {
    res.status(404).json({message: 'Wrong request'});
  });

module.exports = cartRouter;