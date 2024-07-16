
import express from 'express';
import { register, login, getUser} from '../controllers/authController.mjs';
import { verifyToken } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users',verifyToken, getUser);

export default router;
