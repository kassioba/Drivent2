import { notFoundError, unauthorizedError } from '@/errors';
import {
  selectEnrollmentById,
  selectPaymentByTicketId,
  selectSessionByToken,
  selectTicketById,
} from '@/repositories/payment-repository';

export async function getPaymentByTicketId(ticketId: number, token: string) {
  const ticket = await selectTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const check = await checkIfTicketBelongsToUser(token, ticket.enrollmentId);

  if (!check) throw unauthorizedError();

  return await selectPaymentByTicketId(ticketId);
}

async function checkIfTicketBelongsToUser(token: string, enrollmentId: number) {
  const session = await selectSessionByToken(token.split(' ')[1]);

  const enrollment = await selectEnrollmentById(enrollmentId);

  return session.userId === enrollment.userId;
}
