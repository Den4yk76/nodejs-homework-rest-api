import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import guard from '../../../middlewares/guard';
import {
  registration,
  login,
  logout,
  currentUser,
  updateSubscription,
  updateAvatar,
} from '../../../controllers/auth';
import { validateAuth, validateUpdateSubscription } from './validation';

const FILE_DIR = path.resolve('./tmp');

const router = new Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage, limits: { fileSize: 500000 } });

router.post('/signup', validateAuth, registration);
router.post('/login', validateAuth, login);
router.post('/logout', guard, logout);
router.post('/current', guard, currentUser);
router.patch('/', guard, validateUpdateSubscription, updateSubscription);

router.patch(
  '/avatars',
  guard,
  uploadMiddleware.single('avatar'),
  updateAvatar,
);

export default router;
