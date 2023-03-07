import React from 'react'
import { TicketSelectionAmountContainer, TicketType } from './TicketSelectionAmountContainer'
import '../../../scss/booking/TicketSelection.scss'

export const TicketSelection = () => {
  const ticketTypes = Object.values(TicketType);

  return (
    <div className='ticket-selection'>
      {/* Header */}
      <h4>Choose number of tickets</h4>
      {/* Ticket selection */}
      {ticketTypes.map((ticketType) => (
        <TicketSelectionAmountContainer key={ticketType} ticketType={ticketType} />
      ))}
    </div>
  );
};
