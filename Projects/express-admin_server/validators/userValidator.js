const { body } = require('express-validator'); 
const UserModel = require('../models/UserModel')
const validate = require('../middlewares/validateMiddleware')

exports.register = validate([
    body('username').isLength({min:6, max:12}).withMessage('Username has to be 6-12 digit!'),
    body('password').isLength({min:8, max:16}).withMessage('Password has to be 8-16 digit!'),
    body('email')
        .notEmpty().withMessage('Email cannot be empty!')
        .isEmail().withMessage('Email is not valid!')
        .bail()
        .custom(email => {    
            UserModel.findOne({email})
                .then(user => {
                    if (user) {
                        res.send({status: 1, msg: 'Someone already uses this email, please try another one!'})
                    }
                })
        })
])