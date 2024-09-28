import express from 'express';
import { body } from 'express-validator';
import authController from '../../controllers/auth/auth.js';
const router = express.Router();
router
    .post(
        '/auth/signup',
        body('email').isEmail().trim(),
        body('password').isLength({ min: 6 }),
        body('role').isIn(['user', 'admin', 'vendor']),
        body('firstName').isString(),
        body('lastName').isString(),
        body('avatar').isString(),
        body('mobile').isMobilePhone(),
        body('address').isString(),
        body('city').isString(),
        body('state').isString(),
        body('zip').isString(),
        body('country').isString(),
        authController.signup
    );

router.post(
    '/auth/login',
    body('email').isEmail().trim(),
    body('password').isLength({ min: 6 }),
    authController.login
)
router.post(
    '/auth/forget-password',
    body('email').isEmail().trim(),
    authController.forgetPassword
)

router.put(
    '/auth/reset-password',
    body('password').isLength({ min: 6 }),
    body('confirmPassword').isLength({ min: 6 }),
    authController.resetPassword
)
export default router;