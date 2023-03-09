import { TicketType } from "./TicketType";

export class TicketSelection {
  ticketType: TicketType;
  quantity: number;

  constructor(ticketType: TicketType, quantity: number) {
    this.ticketType = ticketType;
    this.quantity = quantity;
  }
}