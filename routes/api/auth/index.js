import { Router } from 'express';
import path from 'path';
import { upload } from '../../../middlewares/upload';
import guard from '../../../middlewares/guard';
import {
    registration,
    login,
    logout,
    currentUser,
    updateSubscription,
    uploadAvatar,
    verification,
    repeatVerificationEmail,
} from '../../../controllers/auth';
import {
    validateAuth,
    validateUpdateSubscription,
    validateResendVerifySchema,
} from './validation';

const router = new Router();

router.post('/signup', validateAuth, registration);
router.post('/login', validateAuth, login);
router.post('/logout', guard, logout);
router.post('/current', guard, currentUser);
router.patch('/', guard, validateUpdateSubscription, updateSubscription);

router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar);

router.get('/verify/:verificationToken', verification);
router.post('/verify', validateResendVerifySchema, repeatVerificationEmail);

export default router;
