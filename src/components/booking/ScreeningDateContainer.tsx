import React from 'react'
import '../../scss/booking/BookingDateContainer.scss'
import { Link } from 'react-router-dom'
import { screeningTimeToString } from '../../data/utils/mapping_utils'
import { SeatsPerAuditorium } from '../../domain/interfaces/SeatsPerAuditorium'
import { Screening } from '../../domain/interfaces/Screening'
import { Movie } from '../../domain/interfaces/Movie'

interface ScreeningDateContainerProps {
  screening: Screening;
  seatsPerAuditorium: SeatsPerAuditorium;
  occupiedSeats: number;
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
          <p className='time'>{screeningTimeToString(new Date(props.screening.time))}</p>
          <p className='auditorium'>
            {
              AuditoriumName[props.screening.auditoriumId - 1]
            }
          </p>
        </div>
        <div className="d-flex">
          <p style={{marginTop: '7px'}}>{props.occupiedSeats} / {props.seatsPerAuditorium.numberOfSeats} occupied</p>
          <Link to={`/book/screening/${props.screening.id}`}><button className='btn'>Choose seats</button></Link>
        </div>
      </div>
      <hr />
    </li>
  )
}