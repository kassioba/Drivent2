import Joi from 'joi';
import { BodyPayment } from '@/protocols';

export const paymentsSchema = Joi.object<BodyPayment>({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().required(),
    cvv: Joi.number().required(),
  },
});
