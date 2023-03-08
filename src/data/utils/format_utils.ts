import { TicketType } from "../../components/booking/book_screening/TicketSelectionAmountContainer";

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


export const getTicketDiscountPercentage = (ticketType: TicketType): number => {
  switch (ticketType) {
    case TicketType.SENIOR:
      return Math.ceil((110 - 85) / 110 * 100);
    case TicketType.CHILD:
      return Math.ceil((110 - 75) / 110 * 100);
    default:
      return 0;
  }
}

export const getTicketDiscountPrice = (ticketType: TicketType, quantity: number): number => {
  let price: number;
  switch (ticketType) {
    case TicketType.SENIOR:
      price = 110 - 85;
      break;
    case TicketType.CHILD:
      price = 110 - 75;
      break;
    default:
      price = 110;
      break;
  }
  return price * quantity;
}