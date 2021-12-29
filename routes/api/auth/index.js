import { Router } from 'express';
import guard from '../../../middlewares/guard';
import { registration, login, logout } from '../../../controllers/auth';

const router = new Router();

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', guard, logout);
// router.post('/current');

export default router;
