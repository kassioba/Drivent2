import { notFoundError } from '@/errors';
import {
  selectAllTicketsType,
  selectEnrollmentByUserId,
  selectSessionByToken,
  selectTicketsByUserId,
} from '@/repositories/tickets-repository';

export async function getTicketTypes() {
  return await selectAllTicketsType();
}

export async function getUserTicketsByToken(token: string) {
  const session = await selectSessionByToken(token.split(' ')[1]);

  const enrollment = await selectEnrollmentByUserId(session.userId);

  if (!enrollment) throw notFoundError();

  const response = await selectTicketsByUserId(session.userId);

  if (!response) throw notFoundError();

  return response;
}
