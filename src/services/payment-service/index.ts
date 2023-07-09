import { notFoundError, unauthorizedError } from '@/errors';
import { BodyPayment } from '@/protocols';
import {
  insertPayment,
  selectEnrollmentByUserId,
  selectPaymentByTicketId,
  selectTicketById,
  selectTicketTypeById,
  updateTicket,
} from '@/repositories/payment-repository';

export async function getPaymentByTicketId(ticketId: number, userId: number) {
  const ticket = await selectTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const check = await checkIfTicketBelongsToUser(userId, ticket);

  if (!check) throw unauthorizedError();

  return await selectPaymentByTicketId(ticketId);
}

export async function postTicketPayment(data: BodyPayment, userId: number) {
  const ticket = await selectTicketById(data.ticketId);

  if (!ticket) throw notFoundError();

  const check = await checkIfTicketBelongsToUser(userId, ticket);

  if (!check) throw unauthorizedError();

  const ticketType = await selectTicketTypeById(ticket.ticketTypeId);

  const payment = await insertPayment(
    data.ticketId,
    ticketType.price,
    data.cardData.issuer,
    data.cardData.number.toString(),
  );

  await updateTicket(data.ticketId);

  return payment;
}

async function checkIfTicketBelongsToUser(userId: number, ticket: Ticket) {
  const enrollment = await selectEnrollmentByUserId(userId);

  return ticket.enrollmentId === enrollment?.id;
}

type Ticket = {
  id: number;
  ticketTypeId: number;
  enrollmentId: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
