const OrderModel = require('../models/OrderModel');

class OrderController {

    newOrder(req, res) {

        const { paymentId, shippingId, order_price, token } = req.body;

        OrderModel.createNewOrder(paymentId, shippingId, order_price, token, result => {
            
            const { msg, status } = result;            
            
            res.status(status).json({message: msg});
        });

    }

    ordersList(req, res) {

        const { token } = req.body;

        OrderModel.getOrdersList(token, result => {
            
            const { msg, status } = result;            
            
            res.status(status).json({message: msg});
        });
    }

    singleOrder(req, res) {

        const { token, id } = req.body;

        OrderModel.getOrder(token, id, result => {
            
            const { msg, status } = result;            
            
            res.status(status).json({message: msg});
        });
    }
}

exports.OrderController = new OrderController();