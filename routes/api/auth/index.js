import { Router } from 'express';
import guard from '../../../middlewares/guard';
import {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
} from '../../../controllers/auth';
import { validateAuth, validateUpdateSubscription } from './validation';

const router = new Router();

router.post('/signup', validateAuth, registration);
router.post('/login', validateAuth, login);
router.post('/logout', guard, logout);
router.post('/current', guard, currentUser);
// TODO: VALIDATION updateSubscription BODY
router.patch('/', guard, validateUpdateSubscription, updateSubscription);

export default router;
