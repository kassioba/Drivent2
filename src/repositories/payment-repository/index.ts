import { prisma } from '@/config';

export async function selectPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

export async function selectTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id,
    },
  });
}

export async function selectEnrollmentById(id: number) {
  return prisma.enrollment.findFirst({
    where: {
      id,
    },
  });
}

export async function selectEnrollmentByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}

export async function insertPayment(ticketId: number, value: number, cardIssuer: string, cardNumber: string) {
  return prisma.payment.create({
    data: {
      ticketId,
      value,
      cardIssuer,
      cardLastDigits: cardNumber.slice(cardNumber.length - 4),
    },
  });
}

export async function selectTicketTypeById(id: number) {
  return prisma.ticketType.findFirst({
    where: {
      id,
    },
  });
}

export async function updateTicket(ticketId: number) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'PAID' },
  });
}
