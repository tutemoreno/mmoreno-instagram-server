import { Router } from 'express';

import { createPost, deletePost } from '../controllers/uploads.js';

const router = Router();

router.post('', createPost);

router.delete('', deletePost);

export default router;
