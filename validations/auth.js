const { body } = require('express-validator');

//User Login Validation
exports.login = [

    body('email').trim().exists().isEmail(),

    body('password').trim().exists().isLength({ min: 8, max: 16 }).withMessage('Password at least 8-16 chars length')

]