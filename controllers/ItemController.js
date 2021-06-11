const ItemModel = require('../models/ItemModel');

class ItemController {
    showItem(req, res) {

        const { id } = req.body;

        ItemModel.getData(id, result => {
            const { msg, status } = result;
            
            res.status(status).json({message: msg});
        });

    }
}

exports.ItemController = new ItemController();