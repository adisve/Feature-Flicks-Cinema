import React from 'react'
import '../../../scss/booking/SeatsGrid.scss'

interface SeatsGridProps {
  totalSeats: number;
  availableSeats: number[];
  selectedSeats: number[];
  handleSeatClicked: (seat: number) => void;
}

export const SeatsGrid = ({
  totalSeats, 
  availableSeats, 
  handleSeatClicked, 
  selectedSeats}: SeatsGridProps) => {

  const seats = Array.from({ length: totalSeats }, (_, index) => index + 1);

  return (
    <div className="seats-grid-container">
      <div className='seats-grid'>
        {
          seats.map((seatNumber) => {
            const isOccupied = !availableSeats.includes(seatNumber)
            return (
              <button 
                disabled={isOccupied ? true : false}
                onClick={() => handleSeatClicked(seatNumber)}
                key={seatNumber} 
                className={`seat-button ${selectedSeats.includes(seatNumber) ? 'selected-seat' : ''}`}>
                  {seatNumber}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
