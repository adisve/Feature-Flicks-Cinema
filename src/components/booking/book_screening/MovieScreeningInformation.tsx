import React from 'react'
import { Movie } from '../../../domain/models/Movie'
import { Screening } from '../../../domain/models/Screening'
import { AuditoriumName } from '../ScreeningDateContainer'
import { screeningTimeToString } from '../../../data/utils/mapping_utils'
import '../../../scss/booking/MovieScreeningInformation.scss'
import { TicketType } from './TicketSelectionAmountContainer'

interface MovieScreeningInformationProps {
  movie: Movie
  screening: Screening
}

export const MovieScreeningInformation: React.FC<MovieScreeningInformationProps> = (props) => {

  return (
    <>
      {/* Movie information */}
      <div className='d-flex movie-screening-information'>

        {/* Poster */}
        <img src={`/assets${props.movie.posterImage}`} alt="" />

        {/* Movie name, hall name, date/location/time */}
        <div className='movie-screening-meta'>
          {/* Movie name */}
          <h4>{props.movie.title}</h4>
          {/* Location */}
          <p>{AuditoriumName[props.screening.auditoriumId-1]}</p>
          {/* Date/time */}
          <p>{screeningTimeToString(props.screening.time)}</p>
        </div>
      </div>
    </>
  )
}
