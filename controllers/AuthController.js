const AuthModel = require('../models/AuthModel');
const validator = require('validator');

class AuthController {
    login(req, res) {

        const { email, pass } = req.body;

        if (
            !validator.isHash(pass, 'md5') ||
            !validator.isEmail(email)
        ) {
            return res.status(400).json({message: 'Wrong data'});
        }

        AuthModel.loginPromised(email, pass, result => {
            const { msg, status } = result;
            
            res.status(status).json({message: msg});
          });

    }

    create(req, res) {
        const { name, tel, email, pass } = req.body;
        if (
            !validator.isLength(name, {min:3, max: 25}) ||
            !validator.isHash(pass, 'md5') ||
            !validator.isEmail(email) ||
            !validator.isMobilePhone(tel, 'any')
        ) {
            return res.status(400).json({message: 'Wrong data'});
        }

        AuthModel.register(name, tel, email, pass, result => {
            const { msg, status } = result;

            return res.status(status).json({message: msg});

        });
    }
}

exports.AuthController = new AuthController();