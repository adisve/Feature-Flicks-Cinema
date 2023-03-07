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
  'Lilla salen',
  'Stora salen',
}

export const ScreeningDateContainer: React.FC<ScreeningDateContainerProps> = (props) => {
  return (
    <li>
      <div className='select-screeningdate-container justify-content-between'>
        <div className='select-screeningtime-auditorium-container'>
          <p className='select-screeningtime'>{screeningTimeToString(props.screening.time)}</p>
          <p className='select-screeningauditorium'>
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