import { Router } from 'express';
import accountsRouter from './accounts';

const router = Router();

router.use('/accounts', accountsRouter);

export default router;
