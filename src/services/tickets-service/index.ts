import { selectAllTicketsType, selectTicketsByToken } from '@/repositories/tickets-repository';

export async function getTicketTypes() {
  return await selectAllTicketsType();
}

export async function getUserTicketsByToken(token: string) {
  const response = await selectTicketsByToken(token.split(' ')[1]);

  return response;
}
