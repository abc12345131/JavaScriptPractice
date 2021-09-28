const { body } = require('express-validator'); 
const UserModel = require('../models/UserModel')
const validate = require('../middlewares/validateMiddleware')

exports.register = validate([
    body('username').matches(/^\w{6,12}$/).withMessage('Username must include 6 to 12 digits the following character types: uppercase, lowercase, numbers, and _ symbol.'),
    body('password').matches(/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,16}$/).withMessage('Password should include 8 to 16 digits, at least two of the following character types: letters, numbers and special characters.'),
    body('userType').notEmpty().withMessage('User type cannot be empty!')
])