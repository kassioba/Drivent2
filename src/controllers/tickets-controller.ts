import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { getTicketTypes } from '@/services';

export async function getAllTicketTypes(req: Request, res: Response) {
  try {
    res.send(await getTicketTypes());
  } catch (err) {
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
