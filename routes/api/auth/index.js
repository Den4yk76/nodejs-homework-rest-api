import { Router } from 'express';
import guard from '../../../middlewares/guard';
import {
  registration,
  login,
  logout,
  currentUser,
} from '../../../controllers/auth';
import { validateAuth } from './validation';

const router = new Router();

router.post('/signup', validateAuth, registration);
router.post('/login', validateAuth, login);
router.post('/logout', guard, logout);
router.post('/current', guard, currentUser);

export default router;
