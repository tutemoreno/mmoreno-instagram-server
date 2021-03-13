import { Router } from 'express';
import { verifyToken } from '../middlewares';

import {
  serverSignUp,
  serverSignIn,
  socialSignIn,
  checkIfAlreadyExists,
} from '../controllers/accounts.js';
import { verify } from 'jsonwebtoken';

const router = Router();

router.post('/server/checkIfAlreadyExists', checkIfAlreadyExists);

router.post('/server/signUp', serverSignUp);

router.post('/server/signIn', serverSignIn);

router.post('/social/signIn', verifyToken, socialSignIn);

export default router;
