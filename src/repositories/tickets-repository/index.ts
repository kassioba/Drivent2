import { prisma } from '@/config';

export async function selectAllTicketsType() {
  return prisma.ticketType.findMany();
}

export async function selectEnrollmentByUserId(userId: number) {
  return await prisma.enrollment.findFirst({
    where: {
      userId,
    },
  });
}

export async function selectTicketsByUserId(userId: number) {
  return prisma.ticket.findFirst({
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

export async function insertTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      status: 'RESERVED',
      ticketTypeId,
      enrollmentId,
    },
  });
}
