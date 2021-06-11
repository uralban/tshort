const authRouter = require('express').Router();
const { AuthController } = require('../controllers/AuthController');


authRouter.post('/create', AuthController.create);
authRouter.post('/login', AuthController.login);

authRouter.use((req, res) => {
    res.status(404).json({message: 'Wrong request'});
  });

module.exports = authRouter;