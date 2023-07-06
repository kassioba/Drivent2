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

  return prisma.ticket.findMany({
    where: {
      Enrollment: {
        userId: session.userId,
      },
    },
  });

  // const enrollment = await prisma.enrollment.findFirst({
  //   where: {
  //     userId: session.userId
  //   }
  // })

  // return prisma.ticket.findFirst({
  //   where: {
  //     enrollmentId: enrollment.id
  //   }
  // })
}
