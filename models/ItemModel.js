const Database = require('./DB');

class ItemModel {
    
    async getData(id, callback) {    

        try {
            const [itemInfo] = await Database.promise().execute(
                'SELECT i.id, name, cost, composition FROM items AS i, compositions AS cmp WHERE i.id=? AND i.composition_id=cmp.id',
                [id]
            );  
            if (itemInfo.length === 0)
                return callback({ 
                success: false, 
                status: 400, 
                msg: 'item not found' 
                });

            const [colors] = await Database.promise().execute(
                'SELECT DISTINCT color FROM items AS i, item_option AS io, options AS o, colors AS c WHERE i.id=io.item_id AND o.id=io.option_id AND i.id=? AND o.color_id = c.id',
                [id]
            ); 

            if (colors.length === 0)
            return callback({ 
              success: false, 
              status: 400, 
              msg: 'Something wrong' 
            });

            const [types] = await Database.promise().execute(
                'SELECT DISTINCT type FROM items AS i, item_option AS io, options AS o, types AS t WHERE i.id=io.item_id AND o.id=io.option_id AND i.id=? AND o.type_id = t.id',
                [id]
            ); 

            if (types.length === 0)
            return callback({ 
              success: false, 
              status: 400, 
              msg: 'Something wrong' 
            });

            const [sizes] = await Database.promise().execute(
                'SELECT DISTINCT size FROM items AS i, item_option AS io, options AS o, sizes AS s WHERE i.id=io.item_id AND o.id=io.option_id AND i.id=? AND o.size_id = s.id',
                [id]
            ); 

            if (sizes.length === 0)
            return callback({ 
              success: false, 
              status: 400, 
              msg: 'Something wrong' 
            });

            const sendData = [
                itemInfo,
                colors,
                types,
                sizes
            ]

          callback({ 
            success: true, 
            status: 201, 
            msg: JSON.stringify(sendData) 
          });
        } catch (error) {
          callback({ 
            success: false, 
            status: 500, 
            msg: JSON.stringify(error) 
          });
        }
    }
}

module.exports = new ItemModel();