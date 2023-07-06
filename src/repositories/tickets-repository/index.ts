import { prisma } from '@/config';

export async function selectAllTicketsType() {
  return prisma.ticketType.findMany();
}

export async function selectTicketsByToken(token: string) {
  const session = await prisma.session.findFirst({
    where: {
      token,
    },
  });

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId: session.userId,
    },
  });

  return prisma.ticket.findMany({
    where: {
      enrollmentId: enrollment.id,
    },
  });
}
