import React from 'react'
import { TicketSelectionAmountContainer } from './TicketSelectionAmountContainer'
import '../../../scss/booking/TicketSelection.scss'
import { TicketSelection } from '../../../domain/models/TicketSelection';
import { TicketType } from '../../../domain/interfaces/TicketType';
import { maxTicketPrice, totalTicketQuantity } from '../../../data/utils/ticket_utils';

interface TicketSelectionProps {
  ticketTypes: TicketType[];
  ticketSelections: {[id: string]: TicketSelection};
  priceDeductions: {[id: string]: number};
  handleTicketAmountChange: (ticketType: TicketType, amount: number) => void;
}

export const TicketSelectionContainer = ({ 
  ticketTypes,
  ticketSelections,
  priceDeductions, 
  handleTicketAmountChange 
  }: TicketSelectionProps) => {
  
  return (
    <div className='ticket-selection'>
      {/* Header */}
      <h4>Choose number of tickets</h4>
      {/* Ticket selection */}
      {ticketTypes.map((ticketType) => (
        <TicketSelectionAmountContainer
          key={ticketType.id}
          totalTicketAmount={totalTicketQuantity(ticketSelections)}
          ticketType={ticketType}
          maxTicketPrice={maxTicketPrice(ticketTypes)}
          ticketAmount={ticketSelections[ticketType.name].quantity}
          handleTicketAmountChange={handleTicketAmountChange} 
          ticketTypePriceDeduction={priceDeductions[ticketType.name]}
        />
      ))}
    </div>
  );
};
