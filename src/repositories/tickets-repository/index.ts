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

export async function selectTicketsByUserId(userId: number) {
  return prisma.ticket.findMany({
    where: {
      Enrollment: {
        userId,
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
