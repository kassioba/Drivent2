import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { BodyPayment } from '@/protocols';
import { getPaymentByTicketId, postTicketPayment } from '@/services';

export async function getPayment(req: Request, res: Response) {
  const ticketId = Number(req.query.ticketId) as number;
  const userId = res.locals.userId as number;

  if (!ticketId || isNaN(ticketId)) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    res.send(await getPaymentByTicketId(ticketId, userId));
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(err.message);
    if (err.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(err.message);

    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postPayment(req: Request, res: Response) {
  const data = req.body as BodyPayment;
  const userId = res.locals.userId as number;

  try {
    res.send(await postTicketPayment(data, userId));
  } catch (err) {
    if (err.name === 'NotFoundError') return res.status(httpStatus.NOT_FOUND).send(err.message);
    if (err.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(err.message);

    console.log(err.message);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
