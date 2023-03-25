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
    state.ticketTypes!, 
    state.selectedSeats!);
  
  const occupiedSeatsArray = state.occupiedSeats!.occupiedSeats.split(',').map((seats) => parseInt(seats, 10));
  const availableSeats = Array.from(Array(state.seatsPerAuditorium!.numberOfSeats), (_, index) => index + 1)
    .filter((seatNumber) => !occupiedSeatsArray.includes(seatNumber));

  const handleTicketAmountChange = (ticketType: TicketType, amount: number) => {
    let selectedSeats = state.selectedSeats!;
    if (amount > 0) {
      for (let i = 1; i < state.seatsPerAuditorium!.numberOfSeats + 1; i++) {
        if (selectedSeats[i] === undefined && !occupiedSeatsArray.includes(i)) {
          console.log(`Adding seat ${i}`);
          selectedSeats[i] = ticketType;
          break;
        }
      }
    } else if (amount < 0) {
      // Find nearest matching seat to remove based on ticket type
      for (let i = state.seatsPerAuditorium!.numberOfSeats + 1; i > 0; i--) {
        if (selectedSeats[i] !== undefined && selectedSeats[i] === ticketType) {
          console.log(`Removing seat ${i}`);
          delete selectedSeats[i];
          break;
        }
      }
    }
    dispatch({ type: 'setSelectedSeats', selectedSeats })
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
