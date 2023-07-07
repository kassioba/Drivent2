import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { createAndSendNewTicket, getTicketTypes, getUserTicketsByToken } from '@/services';

export async function getAllTicketTypes(req: Request, res: Response) {
  try {
    res.send(await getTicketTypes());
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getUserTickets(req: Request, res: Response) {
  const token = req.headers.authorization;

  try {
    const ticket = await getUserTicketsByToken(token);

    res.send(ticket);
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(err.message);

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createNewTicket(req: Request, res: Response) {
  const { ticketTypeId } = req.body;
  const token = req.headers.authorization;

  try {
    res.status(httpStatus.CREATED).send(await createAndSendNewTicket(ticketTypeId, token));
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(err.message);

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
