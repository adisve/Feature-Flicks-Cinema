import React from 'react'
import { Screening } from '../../domain/models/Screening'
import '../../scss/BookingDateContainer.scss'
import { Button } from 'react-bootstrap'

interface BookingDateContainerProps {
  screening: Screening
}

export enum AuditoriumName {
  'Lilla salen',
  'Stora salen',
}

export const BookingDateContainer: React.FC<BookingDateContainerProps> = (props) => {
  return (
    <li>
      <div className='booking-date-container justify-content-between'>
        <div className='booking-time-auditorium-container'>
          <p className='booking-time'>{ props.screening.time.toLocaleString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })}</p>
          <p className='booking-auditorium'>
            {
              AuditoriumName[props.screening.auditoriumId - 1]
            }
          </p>
        </div>
        <button className='btn'>Choose seats</button>
      </div>
      <hr />
    </li>
  )
}