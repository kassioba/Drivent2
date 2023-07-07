import { Router } from 'express';
import { createNewTicket, getAllTicketTypes, getUserTickets } from '@/controllers';
import { authenticateToken, validateBody } from '@/middlewares';
import { ticketSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getAllTicketTypes)
  .get('/', getUserTickets)
  .post('/', validateBody(ticketSchema), createNewTicket);

export { ticketsRouter };
