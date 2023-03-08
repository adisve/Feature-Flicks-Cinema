import React from 'react'
import { TicketSelectionAmountContainer, TicketType } from './TicketSelectionAmountContainer'
import '../../../scss/booking/TicketSelection.scss'

interface TicketSelectionProps {
  [TicketType.SENIOR]: number;
  [TicketType.CHILD]: number;
  [TicketType.REGULAR]: number;
  handleTicketAmountChange: (ticketType: TicketType, amount: number) => void;
}

export const TicketSelection: React.FC<TicketSelectionProps> = (props) => {
  
  const ticketTypes = Object.values(TicketType);
  
  return (
    <div className='ticket-selection'>
      {/* Header */}
      <h4>Choose number of tickets</h4>
      {/* Ticket selection */}
      {ticketTypes.map((ticketType) => (
        <TicketSelectionAmountContainer
          key={ticketType}
          totalTicketAmount={props.Child + props.Senior + props.Regular}
          ticketType={ticketType}
          ticketAmount={props[ticketType]}
          handleTicketAmountChange={props.handleTicketAmountChange}
        />
      ))}
    </div>
  );
};
