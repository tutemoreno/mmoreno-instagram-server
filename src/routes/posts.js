import { Router } from 'express';

import {
  createPost,
  deletePost,
  getPosts,
  getImage,
} from '../controllers/posts';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('', verifyToken, createPost);

router.get('', verifyToken, getPosts);

router.get('/:id', getImage);

router.delete('', verifyToken, deletePost);

export default router;
