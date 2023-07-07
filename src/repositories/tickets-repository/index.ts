import { prisma } from '@/config';

export async function selectAllTicketsType() {
  return prisma.ticketType.findMany();
}

export async function selectSessionByToken(token: string) {
  return await prisma.session.findFirst({
    where: {
      token,
    },
  });
}

export async function selectEnrollmentByUserId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}

export async function selectTicketsByUserId(userId: number) {
  return prisma.ticket.findMany({
    where: {
      Enrollment: {
        userId,
      },
    },
    include: {
      TicketType: true,
    },
  });
}
