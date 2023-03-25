import { TicketType } from "../../domain/interfaces/TicketType";

export const totalTicketQuantity = (selectedSeats: {[id: string]: TicketType}): number => {
  let totalQuantity = 0;
  for (const id in selectedSeats) {
    totalQuantity++;
  }
  return totalQuantity;
}

export const calcualteSubTotal = (selectedSeats: {[id: string]: TicketType}): number => {
  let subtotal = 0;
  for (const id in selectedSeats) {
    const ticket = selectedSeats[id];
    subtotal += ticket.price
  }
  return subtotal;
}

export const calculatePriceDeductions = (ticketTypes: TicketType[], selectedSeats: {[id: string]: TicketType}): {[id: string]: number} => {
  // find maximum price in the ticket selection
  const maxPrice = maxTicketPrice(ticketTypes);
  // calculate price deduction on each ticket type
  const priceDeductionDict: {[id: string]: number} = {};
  for (const id in selectedSeats) {
    const ticket = selectedSeats[id];
    if (ticket.price > maxPrice) {
      priceDeductionDict[id] = maxPrice - ticket.price;
    } else {
      priceDeductionDict[id] = 0;
    }
  }
  return priceDeductionDict;
}

export const calculateTotalPriceDeductions = (
  selectedSeats: {[id: string]: TicketType}, 
  priceDeductionDict: {[id: string]: number}): number => {
  let totalPriceDeduction = 0;
  // Find price deduction on each ticket type and add it to total price deduction
  for (const id in selectedSeats) {
    const ticket = selectedSeats[id];
    totalPriceDeduction += ticket.price * priceDeductionDict[id];
  }
  return totalPriceDeduction;
}

export const calculateDiscountPercentage = (
  ticketTypePriceDeduction: number,
  maxTicketPrice: number,
  ): number => {
  return Math.ceil((ticketTypePriceDeduction / maxTicketPrice) * 100);
}

export const maxTicketPrice = (ticketTypes: TicketType[]): number => {
  return ticketTypes.reduce((max, ticketType) => Math.max(max, ticketType.price), 0);
}
