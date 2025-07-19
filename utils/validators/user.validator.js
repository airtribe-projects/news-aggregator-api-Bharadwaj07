const {body} = require('express-validator');


const validateCreateUser =[
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min: 3})
        .withMessage('Name must be at least 3 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
    body('preferences')
        .optional()
        .isArray()
        .withMessage('Preferences must be an array')
]

const validateLoginUser = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];


const validateUpdatePreferences = [
    body('preferences')
        .notEmpty()
        .withMessage('Preferences are required')
        .isArray()
        .withMessage('Preferences must be an array')
];

module.exports = {
    validateCreateUser,
    validateLoginUser,
    validateUpdatePreferences,
};