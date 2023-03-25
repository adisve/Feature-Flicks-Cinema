import { TicketType } from "../../domain/interfaces/TicketType";

export const totalTicketQuantity = (
  selectedSeats: {[id: string]: TicketType}): number => {
  return Object.keys(selectedSeats).length;
}


export const calcualteSubTotal = (
  selectedSeats: {[id: string]: TicketType}): number => {
  return Object.values(selectedSeats)
    .reduce((subtotal: number, ticket: TicketType) => subtotal + ticket.price, 0);
}


export const calculatePriceDeductions = (
  ticketTypes: TicketType[]): {[id: string]: number} => {
  // find maximum price in the ticket selection
  const maxPrice = maxTicketPrice(ticketTypes);
  // calculate price deduction on each ticket type
  return ticketTypes.reduce((priceDeductionDict: {[id: string]: number}, ticket: TicketType) => {
    const deduction = ticket.price < maxPrice ? maxPrice - ticket.price : 0;
    return {...priceDeductionDict, [ticket.name]: deduction};
  }, {});
}


export const quantityForTicket = (
  ticketName: string,
  selectedSeats: { [id: string]: TicketType }
): number =>
  Object.values(selectedSeats)
    .filter((ticket) => ticket.name === ticketName)
    .reduce((quantity, ticket) => quantity + 1, 0);


export const calculateTotalPriceDeductions = (
  selectedSeats: {[id: string]: TicketType}, 
  priceDeductionDict: {[id: string]: number}): number => {
  return Object.values(selectedSeats)
    .reduce((totalPriceDeduction: number, ticket: TicketType) => {
      const priceDeduction = priceDeductionDict[ticket.name] || 0;
      return totalPriceDeduction + priceDeduction;
    }, 0);
}

export const getAvailableSeatRanges = (
  occupiedSeatsArray: number[], 
  numberOfSeats: number): number[][] => {
  const availableSeatRanges: number[][] = [];
  let currentRange: number[] = [];
  for (let i = 1; i <= numberOfSeats; i++) {
    if (!occupiedSeatsArray.includes(i)) {
      currentRange.push(i);
    } else {
      if (currentRange.length > 0) {
        availableSeatRanges.push(currentRange);
        currentRange = [];
      }
    }
  }
  if (currentRange.length > 0) {
    availableSeatRanges.push(currentRange);
  }
  return availableSeatRanges;
};

export const calculateDiscountPercentage = (
  ticketTypePriceDeduction: number,
  maxTicketPrice: number,
  ): number => {
  return Math.ceil((ticketTypePriceDeduction / maxTicketPrice) * 100);
}

export const maxTicketPrice = (ticketTypes: TicketType[]): number => {
  return ticketTypes.reduce((max, ticketType) => Math.max(max, ticketType.price), 0);
}

export const findNextAvailableSeat = (selectedSeats: {[id: string]: TicketType}, numberOfSeats: number, occupiedSeatsArray: number[], ticketType: TicketType) => {
  return Array.from({ length: numberOfSeats }, (_, i) => i + 1)
    .find((seatNumber) => selectedSeats[seatNumber] === undefined && !occupiedSeatsArray.includes(seatNumber));
}

export const findMatchingSeat = (selectedSeats: {[id: string]: TicketType}, numberOfSeats: number, ticketType: TicketType) => {
  return Array.from({ length: numberOfSeats }, (_, i) => i + 1)
    .reverse()
    .find((seatNumber) => selectedSeats[seatNumber] === ticketType);
}