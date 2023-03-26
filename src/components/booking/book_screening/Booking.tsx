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
import { 
  calculatePriceDeductions, 
  handleAddTickets,
  handleRemoveTickets} 
from '../../../data/utils/ticket_utils';

export const Booking = () => {
  const [state, dispatch] = useBooking();

  if (state.pageStatus === PageStatus.Loading) {
    return <Loading />;
  }
  
  if (state.pageStatus === PageStatus.Error) {
    return <ErrorMessage />;
  }

  const priceDeductions = calculatePriceDeductions(
    state.ticketTypes!);
  
  const occupiedSeatsArray = state.occupiedSeats!.occupiedSeats.split(',').map((seats) => parseInt(seats, 10));
  const availableSeats = Array.from(Array(state.seatsPerAuditorium!.numberOfSeats), (_, index) => index + 1)
    .filter((seatNumber) => !occupiedSeatsArray.includes(seatNumber));

  // Function that handles changes to the number of tickets.
  const handleTicketAmountChange = (ticketType: TicketType, amount: number) => {
    const selectedSeats = state.selectedSeats!;
    const selectedSeatNumbers = Object.keys(selectedSeats).map(Number);
    if (amount > 0) {
      const newSelectedSeats = handleAddTickets(
        selectedSeatNumbers,
        selectedSeats,
        occupiedSeatsArray,
        ticketType,
        state.seatsPerAuditorium!.numberOfSeats
      );
      dispatch({ type: 'setSelectedSeats', selectedSeats: newSelectedSeats });
    } else if (amount < 0) {
      const newSelectedSeats = handleRemoveTickets(
        selectedSeats, ticketType, state.seatsPerAuditorium!.numberOfSeats);
      dispatch({ type: 'setSelectedSeats', selectedSeats: newSelectedSeats });
    }
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
            ticketTypes={state.ticketTypes!}
            priceDeductions={priceDeductions} 
            selectedSeats={state.selectedSeats!}          
          />
        </div>
        {/* Choose number of tickets (regular, child, senior) */}
        <TicketSelectionContainer
          handleTicketAmountChange={handleTicketAmountChange}
          ticketTypes={state.ticketTypes!}
          selectedSeats={state.selectedSeats!}
          priceDeductions={priceDeductions}
        />
      </div>
      {/* Choose seats (grid) */}
      <SeatsGrid
        selectedSeats={Object.keys(state.selectedSeats!).map(Number)}
        totalSeats={state.seatsPerAuditorium!.numberOfSeats}
        availableSeats={availableSeats}
        handleSeatClicked={() => console.log('handleSeatClicked')}
      />
    </div>
  );
};
