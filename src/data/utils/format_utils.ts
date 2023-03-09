import { TicketType } from "../../domain/models/TicketType";

/**
 * Formats a string for display in the UI, specifically for use
 * in components that require the running time of the movie.
 * @param minutes 
 * @returns 
 */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString()} h ${remainingMinutes.toString()} min`;
}

export const dateHasPassed = (date: Date): boolean => {
  const currentDate = new Date();
  return date < currentDate;
}


export const getTicketDiscountPercentage = (ticketType: string): number => {
  switch (ticketType) {
    case 'Senior':
      return Math.ceil((110 - 85) / 110 * 100);
    case 'Child':
      return Math.ceil((110 - 75) / 110 * 100);
    default:
      return 0;
  }
}

export const getTicketDiscountPrice = (ticketType: string, quantity: number): number => {
  let price: number;
  switch (ticketType) {
    case 'Senior':
      price = 110 - 85;
      break;
    case 'Child':
      price = 110 - 75;
      break;
    default:
      price = 110;
      break;
  }
  return price * quantity;
}