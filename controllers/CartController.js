const CartModel = require('../models/CartModel');

class CartController {

    addToCart(req, res) {

        const { id, cost, type, size, color, token } = req.body;

        CartModel.getAllData(id, cost, type, size, color, token, result => {
            
            const { msg, status } = result;            
            
            res.status(status).json({message: msg});
        });

    }

    showCart(req, res) {

        const { token } = req.body;

        CartModel.getCartData(token, result => {

            const { msg, status } = result;  

            res.status(status).json({message: msg});
        }); 
    }

    addOneItem(req, res){
        const { token, item_id, option_id, quantity, cost } = req.body;

        CartModel.addOneItem(token, item_id, option_id, quantity, cost, result => {

            const { msg, status } = result;  

            res.status(status).json({message: msg});
        });
    }

    removeOneItem(req, res){
        const { token, item_id, option_id, quantity, cost } = req.body;

        CartModel.removeOneItem(token, item_id, option_id, quantity, cost, result => {

            const { msg, status } = result;  

            res.status(status).json({message: msg});
        });
    }

    showForCheckout(req, res) {
        const { token } = req.body;

        CartModel.getCheckoutData(token, result => {

            const { msg, status } = result;  

            res.status(status).json({message: msg});
        });
    }

    topBarItems(req, res) {
        const { token } = req.body;

        CartModel.getTopBarItems(token, result => {

            const { msg, status } = result;  

            res.status(status).json({message: msg});
        });
    }
}

exports.CartController = new CartController();