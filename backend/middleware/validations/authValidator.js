import { body } from 'express-validator';
import { authController } from '../../controllers/auth/auth.js';
export const loginValidation = [
    body('email').isEmail().trim(),
    body('password').isLength({ min: 6 }).isRequired(),
    body('role').isIn(['user', 'admin', 'vendor']).isRequired(),
    body('firstName').isString().isRequired(),
    body('lastName').isString().isRequired(),
    body('avatar').isString(),
    body('mobile').isMobilePhone().isRequired(),
    body('address').isString(),
    body('city').isString(),
    body('state').isString(),
    body('zip').isString(),
    body('country').isString(),
    authController.signup
];

