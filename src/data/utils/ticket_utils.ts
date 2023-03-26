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


export const findMatchingSeat = (selectedSeats: {[id: string]: TicketType}, numberOfSeats: number, ticketType: TicketType) => {
  return Array.from({ length: numberOfSeats }, (_, i) => i + 1)
    .reverse()
    .find((seatNumber) => selectedSeats[seatNumber] === ticketType);
}


// This function updates the selected seats object with a new selection.
export const updateSelectedSeats = (
  availableSeatRange: number[],
  selectedSeatNumbers: number[],
  selectedSeats: { [id: number]: TicketType },
  ticketType: TicketType,
): {[id : string]: TicketType} => {
  const newSelectedSeats: { [id: number]: TicketType } = {};
  let index = 0;
  for (let i = 0; i < availableSeatRange.length; i++) {
    const seatNumber = availableSeatRange[i];
    if (index < selectedSeatNumbers.length) {
      const selectedSeatNumber = selectedSeatNumbers[index];
      if (selectedSeats[selectedSeatNumber]) {
        newSelectedSeats[seatNumber] = selectedSeats[selectedSeatNumber];
        delete selectedSeats[selectedSeatNumber];
        index++;
      }
    } else {
      newSelectedSeats[seatNumber] = ticketType;
      break;
    }
  }
  Object.assign(newSelectedSeats, selectedSeats);
  return newSelectedSeats;
};


// This function handles adding tickets.
export const handleAddTickets = (
  selectedSeatNumbers: number[],
  selectedSeats: { [id: number]: TicketType },
  occupiedSeatsArray: number[],
  ticketType: TicketType,
  numberOfSeats: number
): {[id : string]: TicketType} => {
  const availableSeatRanges = getAvailableSeatRanges(
    occupiedSeatsArray,
    numberOfSeats
  );
  const firstAvailableRange = availableSeatRanges.find(
    (range) => range.length >= selectedSeatNumbers.length + 1
  );
  let newSelectedSeats: {[id : string]: TicketType} = selectedSeats;
  if (firstAvailableRange) {
    newSelectedSeats = updateSelectedSeats(
      firstAvailableRange,
      selectedSeatNumbers,
      selectedSeats,
      ticketType,
    );
  }
  return newSelectedSeats;
};


// This function handles removing tickets.
export const handleRemoveTickets = (
  selectedSeats: { [id: number]: TicketType },
  ticketType: TicketType,
  numberOfSeats: number
): {[id : string]: TicketType} => {
  const matchingSeat = findMatchingSeat(
    selectedSeats,
    numberOfSeats,
    ticketType
  );
  if (matchingSeat) {
    delete selectedSeats[matchingSeat];
  }
  return selectedSeats;
};