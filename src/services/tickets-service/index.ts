import { notFoundError } from '@/errors';
import {
  insertTicket,
  selectAllTicketsType,
  selectEnrollmentByUserId,
  selectTicketsByUserId,
} from '@/repositories/tickets-repository';

export async function getTicketTypes() {
  return await selectAllTicketsType();
}

export async function getUserTicketsByToken(userId: number) {
  const enrollment = await selectEnrollmentByUserId(userId);

  if (!enrollment) throw notFoundError();

  const tickets = await selectTicketsByUserId(userId);

  if (!tickets) throw notFoundError();

  return tickets;
}

export async function createAndSendNewTicket(ticketTypeId: number, userId: number) {
  const enrollment = await selectEnrollmentByUserId(userId);

  if (!enrollment) throw notFoundError();

  await insertTicket(ticketTypeId, enrollment.id);

  return await selectTicketsByUserId(userId);
}
