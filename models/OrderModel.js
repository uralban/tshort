const Database = require('./DB');

class OrderModel { 

    async createNewOrder (paymentId, shippingId, order_price, token, callback) {

        try {

            const [userInfo] = await Database.promise().execute(
                'SELECT id FROM users WHERE token=? LIMIT 1',
                [token]
            );  
            

            if (userInfo.length === 0)
                return callback({ 
                status: 401, 
                msg: 'User not found' 
                });

            const user_id = userInfo[0].id;

            const [ordersIdInfo] = await Database.promise().execute(
                'SELECT max(id) as id FROM orders LIMIT 1'
            );  

            if (ordersIdInfo.length === 0)
                return callback({ 
                status: 400, 
                msg: 'Something was wrong' 
                });
            
            let order_id;
            (ordersIdInfo[0].id === null) ? order_id = 1 : order_id = ordersIdInfo[0].id*1 + 1;

            const [cartInfo] = await Database.promise().execute(
                'SELECT item_id, option_id, quantity, cost FROM cart as c, items as i WHERE c.user_id=? AND c.item_id=i.id',
                [user_id]
            );  

            if (cartInfo.length === 0)
                return callback({ 
                status: 400, 
                msg: 'Something was wrong' 
                });            

            await Database.promise().execute(
                "INSERT INTO orders VALUES (? , 1 , NOW() , ? , ? , ?, ?)",
                [order_id, user_id, paymentId, shippingId, order_price],
                result => {
                    const { success, msg } = result;
        
                    if (!success) {
                        callback({
                        msg: msg, 
                        status: 500});
                    }
                });

            for (let i=0; i<cartInfo.length; i++){
                
                await Database.promise().execute(
                    "INSERT INTO order_item VALUES (?, ?, ?, ?, ?)",
                    [order_id, cartInfo[i].option_id, cartInfo[i].item_id, cartInfo[i].quantity, cartInfo[i].cost],
                    result => {
                        const { success, msg } = result;
            
                        if (!success) {
                            callback({
                            msg: msg, 
                            status: 500});
                        }
                    }
                );
            }

            await Database.promise().execute(
                "DELETE FROM cart WHERE user_id=?",
                [user_id],
                result => {
                    const { success, msg } = result;
        
                    if (!success) {
                        callback({
                        msg: msg, 
                        status: 500});
                    }
                }
            );

            callback({ 
                status: 201, 
                msg: JSON.stringify(userInfo) 
            });

        } catch (error) {
            callback({ 
                status: 500, 
                msg: JSON.stringify(error) 
            });
        }

    }

    async getOrdersList(token, callback) {

        try {

            const [userInfo] = await Database.promise().execute(
                'SELECT id FROM users WHERE token=? LIMIT 1',
                [token]
            );  
            

            if (userInfo.length === 0)
                return callback({ 
                status: 401, 
                msg: 'User not found' 
                });

            const user_id = userInfo[0].id;

            const [ordersInfo] = await Database.promise().execute(
                'SELECT o.id, o.order_date, s.status, o.price FROM orders as o, statuses as s WHERE o.user_id=? AND o.status_id=s.id',
                [user_id]
            );  

            if (ordersInfo.length === 0)
                return callback({ 
                status: 400, 
                msg: 'Something was wrong' 
            });

            callback({ 
                status: 201, 
                msg: JSON.stringify(ordersInfo) 
            });

        } catch (error) {
            callback({ 
                status: 500, 
                msg: JSON.stringify(error) 
            });
        }
    }

    async getOrder(token, id, callback) {

        try {

            const [userInfo] = await Database.promise().execute(
                'SELECT id FROM users WHERE token=? LIMIT 1',
                [token]
            );  
            

            if (userInfo.length === 0)
                return callback({ 
                status: 401, 
                msg: 'User not found' 
                });

            const user_id = userInfo[0].id;

            const [orderInfo] = await Database.promise().execute(
                'SELECT o.id, o.order_date, s.status, o.price, p.payment, sh.shipping FROM orders as o, statuses as s, payments as p, shippings as sh WHERE o.user_id=? AND o.id=? AND o.status_id=s.id AND o.payment_id=p.id AND o.shipping_id=s.id LIMIT 1',
                [user_id, id]
            );  

            if (orderInfo.length === 0)
                return callback({ 
                status: 402, 
                msg: 'This is not your order' 
            });

            const [itemsArr] = await Database.promise().execute(
                'SELECT oi.cost, oi.quantity, i.name, cm.composition, t.type, c.color, s.size FROM order_item as oi, items as i, compositions as cm, options as o, types as t, colors as c, sizes as s WHERE oi.order_id=? AND oi.item_id=i.id AND i.composition_id=cm.id AND oi.option_id=o.id AND o.type_id=t.id AND o.size_id=s.id AND o.color_id=c.id',
                [id]
            );  

            if (itemsArr.length === 0)
                return callback({ 
                status: 500, 
                msg: 'Something wrong' 
            });

            const sendData = [
                orderInfo,
                itemsArr
            ]

            callback({ 
                status: 201, 
                msg: JSON.stringify(sendData) 
            });

        } catch (error) {
            callback({ 
                status: 500, 
                msg: JSON.stringify(error) 
            });
        }
    }
}

module.exports = new OrderModel();