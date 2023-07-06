import { Router } from 'express';
import { getAllTicketTypes, getUserTickets } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getAllTicketTypes).get('/', getUserTickets);

export { ticketsRouter };
