import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { getPaymentByTicketId } from '@/services';

export async function getPayment(req: Request, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const token = req.headers.authorization;

  if (!ticketId || isNaN(ticketId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    res.send(await getPaymentByTicketId(ticketId, token));
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(err.message);
    if (err.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(err.message);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
