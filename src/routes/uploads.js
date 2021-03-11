import { Router } from 'express';

import { createPost, deletePost } from '../controllers/uploads.js';
import { verifyToken } from '../middlewares/index.js';

const router = Router();

router.post('', verifyToken, createPost);

router.delete('', verifyToken, deletePost);

export default router;
