import React from 'react'
import { Screening } from '../../domain/models/Screening'
import '../../scss/booking/BookingDateContainer.scss'
import { Link } from 'react-router-dom'
import { Movie } from '../../domain/models/Movie'
import { screeningTimeToString } from '../../data/utils/mapping_utils'

interface ScreeningDateContainerProps {
  screening: Screening;
  movie: Movie;
}

export enum AuditoriumName {
  'Lilla salongen',
  'Stora salongen',
}

export const ScreeningDateContainer: React.FC<ScreeningDateContainerProps> = (props) => {
  return (
    <li>
      <div className='date-container justify-content-between'>
        <div className='time-auditorium-container'>
          <p className='time'>{screeningTimeToString(props.screening.time)}</p>
          <p className='auditorium'>
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