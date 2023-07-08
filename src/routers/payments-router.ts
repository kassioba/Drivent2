import { Router } from 'express';
import { getPayment } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const paymentRouter = Router();

paymentRouter.all('/*', authenticateToken).get('', getPayment);

export { paymentRouter };
