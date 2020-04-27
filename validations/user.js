const { body } = require('express-validator');

//User Register Validation
exports.register = [

    body('email').trim().exists().isEmail(),

    body('password').trim().exists().isLength({ min: 8, max: 16 }).withMessage('Password at least 8-16 chars length'),

    body('password2').trim().exists().isLength({ min: 8, max: 16 }).withMessage('Password at least 8-16 chars length')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        })

]

//User Update Validation
exports.update = [

    body('password').trim().exists().isLength({ min: 8, max: 16 }).withMessage('Password at least 8-16 chars length'),

    body('newPassword').trim().exists().isLength({ min: 8, max: 16 }).withMessage('Password at least 8-16 chars length')
        .custom((value, { req }) => {
            if (value === req.body.password) {
                throw new Error('New password can not same old password.')
            }
            return true;
        })

]