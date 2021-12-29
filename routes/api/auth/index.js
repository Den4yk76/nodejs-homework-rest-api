import { Router } from 'express';
import { registration, login, logout } from '../../../controllers/auth';

const router = new Router();

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', logout);
// router.post('/current');

export default router;
