const Database = require('./DB');

class CartModel {
    
    async getAllData(
        item_id, 
        item_cost, 
        type, 
        size, 
        color, 
        token, 
        callback
        ) {    

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

            const [optionInfo] = await Database.promise().execute(
                'SELECT o.id FROM options as o, types as t, sizes as s, colors as c WHERE o.type_id=t.id AND o.size_id=s.id AND o.color_id=c.id AND type=? AND size=? AND color=? LIMIT 1',
                [type, size, color]
            );

            if (optionInfo.length === 0)
                return callback({ 
                status: 400, 
                msg: 'Something wrong' 
                });

            const option_id = optionInfo[0].id;

            const [cartInfo] = await Database.promise().execute(
                'SELECT c.quantity FROM cart as c WHERE c.user_id=? AND c.item_id=? AND c.option_id=? LIMIT 1',
                [user_id, item_id, option_id]
            );

            if (cartInfo.length === 0) {
                await Database.promise().execute(
                    "INSERT INTO cart VALUES (? , ? , ? , ? , ?)",
                    [user_id, item_id, option_id, 1, item_cost],
                    result => {
                      const { success, msg } = result;
            
                      if (!success) return callback({
                        msg: msg, 
                        status: 500});
                    }
                );
            } else {
                await Database.promise().execute(
                    "UPDATE cart as c SET c.quantity=? , c.total_price=? WHERE c.user_id=? AND c.item_id=? AND c.option_id=? LIMIT 1",
                    [cartInfo[0].quantity*1 + 1, item_cost * (cartInfo[0].quantity*1 + 1), user_id, item_id, option_id],
                    result => {
                      const { success, msg } = result;
            
                      if (!success) return callback({
                        msg: msg, 
                        status: 500});
                    }
                );
            }
                
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

    async getCartData(token, callback) {    

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

            const [cartInfo] = await Database.promise().execute(
                'SELECT c.user_id, c.item_id, c.option_id, c.quantity, c.total_price, t.type, s.size, cl.color, i.name, i.cost, cm.composition FROM cart as c, options as o, sizes as s, colors as cl, types as t, items as i, compositions as cm WHERE c.user_id=? AND c.option_id=o.id AND o.type_id=t.id AND o.color_id=cl.id AND o.size_id=s.id AND c.item_id=i.id AND i.composition_id=cm.id',
                [user_id]
            );

            if (cartInfo.length === 0)
                return callback({ 
                status: 400, 
                msg: 'No items in cart' 
                });
                
            callback({ 
                status: 201, 
                msg: JSON.stringify(cartInfo) 
            });
        
        } catch (error) {
            callback({ 
                status: 500, 
                msg: JSON.stringify(error) 
            });
        }
    }

    async addOneItem(token, item_id, option_id, quantity, cost, callback) {    

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

            await Database.promise().execute(
                "UPDATE cart as c SET c.quantity=? , c.total_price=? WHERE c.user_id=? AND c.item_id=? AND c.option_id=? LIMIT 1",
                [quantity*1 + 1, cost * (quantity*1 + 1), user_id, item_id, option_id],
                result => {
                    const { success, msg } = result;
          
                    if (!success) return callback({
                      msg: msg, 
                      status: 510});
                }
            );
                
            callback({ 
                status: 201, 
                msg: JSON.stringify('ok') 
            });
        
        } catch (error) {
            callback({ 
                status: 500, 
                msg: JSON.stringify(error) 
            });
        }
    }

    async removeOneItem(token, item_id, option_id, quantity, cost, callback) {    

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

            if (quantity > 1) {
                await Database.promise().execute(
                    "UPDATE cart as c SET c.quantity=? , c.total_price=? WHERE c.user_id=? AND c.item_id=? AND c.option_id=? LIMIT 1",
                    [quantity*1 - 1, cost * (quantity*1 - 1), user_id, item_id, option_id],
                    result => {
                        const { success, msg } = result;
            
                        if (!success) return callback({
                        msg: msg, 
                        status: 500});
                    }
                );
            } else {
                await Database.promise().execute(
                    "DELETE FROM cart WHERE user_id=? AND item_id=? AND option_id=? LIMIT 1",
                    [user_id, item_id, option_id],
                    result => {
                        const { success, msg } = result;
            
                        if (!success) return callback({
                        msg: msg, 
                        status: 500});
                    }
                );
            }   

            callback({ 
                status: 201, 
                msg: JSON.stringify('ok') 
            });
        
        } catch (error) {
            callback({ 
                status: 500, 
                msg: JSON.stringify(error) 
            });
        }
    }

    async getCheckoutData(token, callback) {
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

            const [cartInfo] = await Database.promise().execute(
                'SELECT c.user_id, c.item_id, c.option_id, c.quantity, c.total_price, t.type, s.size, cl.color, i.name, i.cost, cm.composition FROM cart as c, options as o, sizes as s, colors as cl, types as t, items as i, compositions as cm WHERE c.user_id=? AND c.option_id=o.id AND o.type_id=t.id AND o.color_id=cl.id AND o.size_id=s.id AND c.item_id=i.id AND i.composition_id=cm.id',
                [user_id]
            );

            if (cartInfo.length === 0)
                return callback({ 
                status: 400, 
                msg: 'No items in cart' 
                });

            const [paymentsInfo] = await Database.promise().execute(
                'SELECT id, payment FROM payments'
            );

            if (paymentsInfo.length === 0)
                return callback({ 
                status: 400, 
                msg: 'No one payment method available' 
                });

            const [shippingInfo] = await Database.promise().execute(
                'SELECT id, shipping FROM shippings'
            );

            if (shippingInfo.length === 0)
                return callback({ 
                status: 400, 
                msg: 'No one shipping method available' 
                });
            
            const sendData = [
                cartInfo,
                paymentsInfo,
                shippingInfo
            ];
                
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

    async getTopBarItems(token, callback) {
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

            const [cartInfo] = await Database.promise().execute(
                'SELECT c.quantity, c.total_price FROM cart as c WHERE c.user_id=?',
                [user_id]
            );
                
            callback({ 
                status: 201, 
                msg: JSON.stringify(cartInfo) 
            });
        
        } catch (error) {
            callback({ 
                status: 500, 
                msg: JSON.stringify(error) 
            });
        }
    }
}

module.exports = new CartModel();