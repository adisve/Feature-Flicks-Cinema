import React from 'react';
import { TicketSelectionContainer } from './TicketSelectionContainer';
import { MovieScreeningInformation } from './MovieScreeningInformation';
import { TicketSum } from './TicketSum';
import { Loading } from '../../animations/Loading';
import { ErrorMessage } from '../../errors/ErrorMessage';
import { useBooking } from '../../../data/hooks/useBooking';
import '../../../scss/booking/Booking.scss'
import { TicketType } from '../../../domain/interfaces/TicketType';
import { PageStatus } from '../../../domain/enums/PageStatus';

export const ticketPrice = 110;

export const Booking = () => {
  const [state, dispatch] = useBooking();

  const handleTicketAmountChange = (ticketType: TicketType, amount: number) => {
    dispatch({ type: "updateTicketQuantity", ticketName: ticketType.name, quantity: amount });
  };

  if (state.pageStatus === PageStatus.Loading) {
    return <Loading />;
  }
  
  if (state.pageStatus === PageStatus.Error) {
    return <ErrorMessage />;
  }

  return (
    <div>
      {/* Ticket selection (amount), movie information/screening information */}
      <div className='booking-header justify-content-evenly'>
        <div>
          {/* Movie information (name, hall name, time/day/date) and ticket price information */}
          <MovieScreeningInformation 
            movie={state.movie!} 
            screening={state.screening!}
            auditoriumName={state.auditorium!.name}
          />
          {/* Selected tickets, their prices, total sum */}
          <TicketSum 
            regular={state.ticketSelection!['Adult'].quantity} 
            child={state.ticketSelection!['Child'].quantity} 
            senior={state.ticketSelection!['Senior'].quantity}
          />
        </div>
        {/* Choose number of tickets (regular, child, senior) */}
        <TicketSelectionContainer 
          handleTicketAmountChange={handleTicketAmountChange} 
          ticketTypes={[
            state.ticketSelection!['Child'].ticketType,
            state.ticketSelection!['Adult'].ticketType,
            state.ticketSelection!['Senior'].ticketType,
          ]} 
          ticketSelections={state.ticketSelection!}
          />
      </div>
      {/* Choose seats (grid) */}
    </div>
  );
};
