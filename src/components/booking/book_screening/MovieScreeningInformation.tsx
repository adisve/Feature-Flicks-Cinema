import React from 'react'
import { screeningTimeToString } from '../../../data/utils/mapping_utils'
import '../../../scss/booking/MovieScreeningInformation.scss'
import { Movie } from '../../../domain/interfaces/Movie'
import { Screening } from '../../../domain/interfaces/Screening'

interface MovieScreeningInformationProps {
  movie: Movie
  screening: Screening
  auditoriumName: string;
}

export const MovieScreeningInformation = ({
  movie, 
  screening, 
  auditoriumName}: MovieScreeningInformationProps) => {

  return (
    <>
      {/* Movie information */}
      <div className='d-flex movie-screening-information'>

        {/* Poster */}
        <img src={`/assets${movie.description.posterImage}`} alt="" />

        {/* Movie name, hall name, date/location/time */}
        <div className='movie-screening-meta'>
          {/* Movie name */}
          <h4>{movie.title}</h4>
          {/* Location */}
          <p>{auditoriumName}</p>
          {/* Date/time */}
          <p className='screening-time'>{screeningTimeToString(new Date(screening.time))}</p>
        </div>
      </div>
    </>
  )
}
