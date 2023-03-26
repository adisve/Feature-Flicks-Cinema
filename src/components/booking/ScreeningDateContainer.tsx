import React from 'react'
import '../../scss/booking/BookingDateContainer.scss'
import { Link } from 'react-router-dom'
import { screeningTimeToString } from '../../data/utils/mapping_utils'
import { SeatsPerAuditorium } from '../../domain/interfaces/SeatsPerAuditorium'
import { Screening } from '../../domain/interfaces/Screening'

interface ScreeningDateContainerProps {
  screening: Screening;
  seatsPerAuditorium: SeatsPerAuditorium;
  occupiedSeats: number;
  auditoriumName: string;
}

export const ScreeningDateContainer = ({
  screening, 
  seatsPerAuditorium, 
  occupiedSeats, 
  auditoriumName }: ScreeningDateContainerProps) => {
  return (
    <li>
      <div className='date-container justify-content-between'>
        <div className='time-auditorium-container'>
          <p className='time'>{screeningTimeToString(new Date(screening.time))}</p>
          <p className='auditorium'>{auditoriumName}</p>
        </div>
        <div className="d-flex">
          <p style={{marginTop: '7px'}}>{occupiedSeats} / {seatsPerAuditorium.numberOfSeats} occupied</p>
          <Link to={`/book/screening/${screening.id}`}><button className='btn'>Choose seats</button></Link>
        </div>
      </div>
      <hr />
    </li>
  )
}