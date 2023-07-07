import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { getTicketTypes, getUserTicketsByToken } from '@/services';

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
    res.send(await getUserTicketsByToken(token));
  } catch (err) {
    if (err.type === 'Not found') res.status(httpStatus.NOT_FOUND).send(err.message);

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
