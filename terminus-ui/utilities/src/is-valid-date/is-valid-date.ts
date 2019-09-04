import { isValid } from 'date-fns';

export function isValidDate(value: string | Date): boolean {
  const date: Date = (typeof value === 'string') ? new Date(value) : value;
  return isValid(date);
}
