import { ApplicationError } from '@/protocols';

export function notFoundError(): ApplicationError {
  return {
    name: 'Not found',
    message: 'Data do not exist',
  };
}
