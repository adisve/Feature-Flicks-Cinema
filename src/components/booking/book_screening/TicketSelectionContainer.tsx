import React from 'react'
import { TicketSelectionAmountContainer } from './TicketSelectionAmountContainer'
import '../../../scss/booking/TicketSelection.scss'
import { TicketSelection } from '../../../domain/models/TicketSelection';
import { TicketType } from '../../../domain/interfaces/TicketType';

interface TicketSelectionProps {
  ticketTypes: TicketType[];
  ticketSelections: {[id: string]: TicketSelection}
  handleTicketAmountChange: (ticketType: TicketType, amount: number) => void;
}

export const TicketSelectionContainer: React.FC<TicketSelectionProps> = (props) => {
  return (
    <div className='ticket-selection'>
      {/* Header */}
      <h4>Choose number of tickets</h4>
      {/* Ticket selection */}
      {props.ticketTypes.map((ticketType) => (
        <TicketSelectionAmountContainer
          key={ticketType.id}
          totalTicketAmount={
            props.ticketSelections['Child'].quantity + 
            props.ticketSelections['Senior'].quantity + 
            props.ticketSelections['Adult'].quantity
          }
          ticketType={ticketType}
          ticketAmount={props.ticketSelections[ticketType.name].quantity}
          handleTicketAmountChange={props.handleTicketAmountChange}
        />
      ))}
    </div>
  );
};
