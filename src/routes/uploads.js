import { Router } from 'express';

import { createPost } from '../controllers/uploads.js';

const router = Router();

router.post('', createPost);

export default router;
