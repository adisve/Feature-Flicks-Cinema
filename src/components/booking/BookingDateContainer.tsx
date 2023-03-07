import React from 'react'
import { Screening } from '../../domain/models/Screening'
import '../../scss/booking/BookingDateContainer.scss'
import { Link } from 'react-router-dom'
import { Movie } from '../../domain/models/Movie'

interface BookingDateContainerProps {
  screening: Screening;
  movie: Movie;
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
        <Link to={`/book/screening/${props.screening.id}`}><button className='btn'>Choose seats</button></Link>
      </div>
      <hr />
    </li>
  )
}