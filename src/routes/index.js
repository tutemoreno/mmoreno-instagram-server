import { Router } from 'express';
import accountsRouter from './accounts.js';

const router = Router();

router.use('/accounts', accountsRouter);

export default router;
