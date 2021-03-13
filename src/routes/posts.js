import { Router } from 'express';

import { createPost, deletePost, getPosts } from '../controllers/posts';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('', verifyToken, createPost);

router.get('', verifyToken, getPosts);

router.delete('', verifyToken, deletePost);

export default router;
