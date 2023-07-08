import { notFoundError } from '@/errors';
import {
  insertTicket,
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

  const tickets = await selectTicketsByUserId(session.userId);

  if (!tickets) throw notFoundError();

  return tickets;
}

export async function createAndSendNewTicket(ticketTypeId: number, token: string) {
  const session = await selectSessionByToken(token.split(' ')[1]);

  const enrollment = await selectEnrollmentByUserId(session.userId);

  if (!enrollment) throw notFoundError();

  await insertTicket(ticketTypeId, enrollment.id);

  return await selectTicketsByUserId(session.userId);
}
