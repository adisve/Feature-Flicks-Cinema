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
import { SeatsGrid } from './SeatsGrid';
import { getAllTicketTypes } from '../../../data/utils/list_utils';
import { calculatePriceDeductions } from '../../../data/utils/ticket_utils';

export const Booking = () => {
  const [state, dispatch] = useBooking();

  if (state.pageStatus === PageStatus.Loading) {
    return <Loading />;
  }
  
  if (state.pageStatus === PageStatus.Error) {
    return <ErrorMessage />;
  }

  const priceDeductions = calculatePriceDeductions(
    getAllTicketTypes(state.ticketSelection!), 
    state.ticketSelection!);

  const handleTicketAmountChange = (ticketType: TicketType, amount: number) => {
    
    dispatch({ type: "updateTicketQuantity", ticketName: ticketType.name, quantity: amount });
  };

  return (
    <div>
      {/* Ticket selection (amount), movie information/screening information */}
      <div className='booking-header justify-content-evenly'>
        <div>
          {/* Movie information (name, hall name, time/day/date) and ticket price information */}
          <MovieScreeningInformation 
            movie={state.movie!} 
            screening={state.screening!}
            auditoriumName={state.seatsPerAuditorium!.name}
          />
          {/* Selected tickets, their prices, total sum */}
          <TicketSum 
            ticketTypes={getAllTicketTypes(state.ticketSelection!)} 
            ticketSelections={state.ticketSelection!}
            priceDeductions={priceDeductions}
          />
        </div>
        {/* Choose number of tickets (regular, child, senior) */}
        <TicketSelectionContainer
          handleTicketAmountChange={handleTicketAmountChange}
          ticketTypes={getAllTicketTypes(state.ticketSelection!)}
          ticketSelections={state.ticketSelection!} 
          priceDeductions={priceDeductions}
        />
      </div>
      {/* Choose seats (grid) */}
      <SeatsGrid
        selectedSeats={Object.keys(state.selectedSeats!).map(Number)}
        totalSeats={state.seatsPerAuditorium!.numberOfSeats}
        availableSeats={state.availableSeats}
        handleSeatClicked={() => console.log('handleSeatClicked')}
      />
    </div>
  );
};
