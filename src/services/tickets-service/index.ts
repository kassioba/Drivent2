import { selectAllTicketsType } from '@/repositories/tickets-repository';

export async function getTicketTypes() {
  return await selectAllTicketsType();
}
