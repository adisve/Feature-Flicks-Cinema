import React from 'react';
import { TicketSelection } from './TicketSelection';
import { MovieScreeningInformation } from './MovieScreeningInformation';
import { TicketSum } from './TicketSum';
import { PageStatus } from '../../App';
import { Loading } from '../../animations/Loading';
import { ErrorMessage } from '../../errors/ErrorMessage';
import { useBooking } from '../../../data/hooks/useBooking';
import '../../../scss/booking/Booking.scss'
import { TicketType } from './TicketSelectionAmountContainer';

export const ticketPrice = 110;

export const Booking = () => {
  const [state, dispatch] = useBooking();

  const handleTicketAmountChange = (ticketType: TicketType, amount: number) => {
    dispatch({ type: 'setTicketAmount', ticketType, amount });
  };

  if (state.pageStatus === PageStatus.LOADING) {
    return <Loading />;
  }
  
  if (state.pageStatus === PageStatus.ERROR) {
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
          />
          {/* Selected tickets, their prices, total sum */}
          <TicketSum 
            regular={state.Regular} 
            child={state.Child} 
            senior={state.Senior}            
          />
        </div>
        {/* Choose number of tickets (regular, child, senior) */}
        <TicketSelection 
          handleTicketAmountChange={handleTicketAmountChange} 
          Senior={state.Senior} 
          Child={state.Child} 
          Regular={state.Regular} 
        />
      </div>
      {/* Choose seats (grid) */}
    </div>
  );
};
