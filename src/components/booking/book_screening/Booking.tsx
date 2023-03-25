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
  findMatchingSeat, 
  findNextAvailableSeat, 
  getAvailableSeatRanges} 
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
      
      const handleTicketAmountChange = (ticketType: TicketType, amount: number) => {
        const selectedSeats = state.selectedSeats!;
        if (amount > 0) {
          const selectedSeatNumbers = Object.keys(selectedSeats).map(Number);
          const availableSeatRanges = getAvailableSeatRanges(
            occupiedSeatsArray, 
            state.seatsPerAuditorium!.numberOfSeats
          );
          // At least two adjacent seats
          const firstAvailableRange = availableSeatRanges.find(range => range.length >= selectedSeatNumbers.length + 1);
          if (firstAvailableRange) {
            const newSelectedSeats: {[id: number]: TicketType} = {};
            let index = 0;
            for (let i = 0; i < firstAvailableRange.length; i++) {
              const seatNumber = firstAvailableRange[i];
              if (index < selectedSeatNumbers.length) {
                const selectedSeatNumber = selectedSeatNumbers[index];
                if (selectedSeats[selectedSeatNumber]) {
                  console.log(`Moving ${selectedSeatNumber} to ${seatNumber}`);
                  newSelectedSeats[seatNumber] = selectedSeats[selectedSeatNumber];
                  delete selectedSeats[selectedSeatNumber];
                  index++;
                }
              } else {
                console.log(`Adding ${ticketType} to ${seatNumber}`);
                newSelectedSeats[seatNumber] = ticketType;
                break;
              }
            }
            // Update selectedSeats
            for (const seatNumber in selectedSeats) {
              newSelectedSeats[Number(seatNumber)] = selectedSeats[seatNumber];
            }
            dispatch({ type: 'setSelectedSeats', selectedSeats: newSelectedSeats });
          }
        } else if (amount < 0) {
          const matchingSeat = findMatchingSeat(selectedSeats, state.seatsPerAuditorium!.numberOfSeats, ticketType);
          if (matchingSeat) {
            console.log(`Removing seat ${matchingSeat}`);
            delete selectedSeats[matchingSeat];
            dispatch({ type: 'setSelectedSeats', selectedSeats });
          }
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
