const Database = require('./DB');

class CategoryModel {
    
    async getData(category, callback) {    

        try {
          const [categoryInfo] = await Database.promise().execute(
            'SELECT items.id, name, cost, composition FROM items, categories, item_category, compositions WHERE items.id=item_category.item_id AND categories.id=item_category.category_id AND categories.category=? AND items.composition_id=compositions.id',
            [category]
          );  
          if (categoryInfo.length === 0)
            return callback({ 
              success: false, 
              status: 400, 
              msg: 'Category is empty' 
            });
             
          callback({ 
            success: true, 
            status: 201, 
            msg: JSON.stringify(categoryInfo) 
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

module.exports = new CategoryModel();