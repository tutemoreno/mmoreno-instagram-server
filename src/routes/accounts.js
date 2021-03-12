import { Router } from 'express';
import { verifyToken } from '../middlewares/index.js';
import { signIn, signUp } from '../controllers/accounts.js';

const router = Router();

router.post('signUp', signUp);

router.post('signIn', signIn);

router.post('social/signIn', verifyToken, socialSignIn);

export default router;
