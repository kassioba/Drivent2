import { prisma } from '@/config';

export async function selectAllTicketsType() {
  return prisma.ticketType.findMany();
}
