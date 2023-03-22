import { TicketType } from "../../domain/interfaces/TicketType";
import { TicketSelection } from "../../domain/models/TicketSelection";

export const totalTicketQuantity = (ticketSelectionDict: {[id: string]: TicketSelection}): number => {
  let totalQuantity = 0;
  for (const id in ticketSelectionDict) {
    const ticketSelection = ticketSelectionDict[id];
    totalQuantity += ticketSelection.quantity;
  }
  return totalQuantity;
}

export const calcualteSubTotal = (ticketSelectionDict: {[id: string]: TicketSelection}): number => {
  let subtotal = 0;
  for (const id in ticketSelectionDict) {
    const ticketSelection = ticketSelectionDict[id];
    subtotal += ticketSelection.quantity * ticketSelection.ticketType.price;
  }
  return subtotal;
}

export const calculatePriceDeductions = (ticketTypes: TicketType[], ticketSelectionDict: {[id: string]: TicketSelection}): {[id: string]: number} => {
  // find maximum price in the ticket selection
  const maxPrice = maxTicketPrice(ticketTypes);
  // calculate price deduction on each ticket type
  const priceDeductionDict: {[id: string]: number} = {};
  for (const id in ticketSelectionDict) {
    const ticketSelection = ticketSelectionDict[id];
    if (ticketSelection.ticketType.price < maxPrice) {
      priceDeductionDict[id] = maxPrice - ticketSelection.ticketType.price;
    } else {
      priceDeductionDict[id] = 0;
    }
  }
  return priceDeductionDict;
}

export const calculateTotalPriceDeductions = (
  ticketSelectionDict: {[id: string]: TicketSelection}, 
  priceDeductionDict: {[id: string]: number}): number => {
  let totalPriceDeduction = 0;
  // Find price deduction on each ticket type and add it to total price deduction
  for (const id in ticketSelectionDict) {
    const ticketSelection = ticketSelectionDict[id];
    totalPriceDeduction += ticketSelection.quantity * priceDeductionDict[id];
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

export const hasTicketsSelected = (dictionary: {[id: string]: TicketSelection}): boolean => {
  for (const id in dictionary) {
    if (dictionary.hasOwnProperty(id)) {
      const selection = dictionary[id];
      if (selection.quantity > 0) {
        return true;
      }
    }
  }
  return false;
}