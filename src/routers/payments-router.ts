import { Router } from 'express';
import { getPayment, postPayment } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { BodyPayment } from '@/protocols';
import { paymentsSchema } from '@/schemas/payments-schemas';

const paymentRouter = Router();

paymentRouter
  .all('/*', authenticateToken)
  .get('', getPayment)
  .post('/process', validateBody<BodyPayment>(paymentsSchema), postPayment);

export { paymentRouter };
