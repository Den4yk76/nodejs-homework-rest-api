import { Router } from 'express';
import guard from '../../../middlewares/guard';
import {
    registration,
    login,
    logout,
    currentUser,
} from '../../../controllers/auth';

const router = new Router();

router.post('/signup', registration);
router.post('/login', login);
router.post('/logout', guard, logout);

// TODO:
router.post('/current', guard, currentUser);

export default router;
