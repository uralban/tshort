const Database = require('./DB');

class AuthModel {
    
    isExists(email, callback) {
        Database.query(
          'SELECT COUNT(id) as `exists` FROM users WHERE email=? LIMIT 1',
          [email],
          result => {
            callback(result.msg[0].exists === 1);
          }
        );
    }

    register(name, tel, email, pass, callback) {
            
        this.isExists(email, isExists => {
          if (isExists)
            return callback({
              success: false,
              status: 400,
              msg: 'Email already exist',
            });
    
          Database.query(
            "INSERT INTO users VALUES (NULL, ? , ? , ? , ? , '')",
            [name, pass, tel, email],
            result => {
              const { success, msg } = result;
    
              if (!success) return callback({
                success: false,
                msg: msg, 
                status: 500});
    
              callback({
                success: true,
                msg: msg, 
                status: 201
              });
            }
          );
        });
    }
    
    async loginPromised(email, pass, callback) {    
        try {
          const [userInfo] = await Database.promise().execute(
            'SELECT id, username, password, tel, email FROM users WHERE email=? AND password=? LIMIT 1',
            [email, pass]
          );  
          if (userInfo.length === 0)
            return callback({ 
              success: false, 
              status: 400, 
              msg: 'User not exists' 
            });
    
          const { password: securedPass, id } = userInfo[0];
    
          const [{ affectedRows }] = await Database.promise().execute(
            'UPDATE users SET token=SHA1(?) WHERE id=? LIMIT 1',
            [`${email}${securedPass}${new Date().getTime()}`, id]
          );
    
          if (affectedRows === 0)
            return callback({
              success: false,
              status: 400,
              msg: 'Smth went wrong. Please try later.',
            });
    
          const [userToken] = await Database.promise().execute(
            'SELECT token FROM users WHERE id=? LIMIT 1',
            [id]
          );
    
          if (userToken.length === 0)
            return callback({
              success: false,
              status: 400,
              msg: 'Smth went wrong. Please try later.',
            });
    
          callback({ 
            success: true, 
            status: 201, 
            msg: userToken[0].token 
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

module.exports = new AuthModel();