import { Router } from 'express';

import { createPost, deletePost } from '../controllers/uploads.js';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('', verifyToken, createPost);

router.delete('', verifyToken, deletePost);

export default router;
