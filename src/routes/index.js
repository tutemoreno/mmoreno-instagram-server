import { Router } from 'express';
import accountsRouter from './accounts.js';
import uploadsRouter from './uploads.js';

const router = Router();

router.use('/accounts', accountsRouter);
router.use('/uploads', uploadsRouter);

export default router;
