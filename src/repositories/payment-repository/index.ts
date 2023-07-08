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

export async function selectSessionByToken(token: string) {
  return prisma.session.findFirst({
    where: {
      token,
    },
  });
}
