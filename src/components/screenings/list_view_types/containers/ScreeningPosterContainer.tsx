import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { formatMinutes } from '../../../../data/utils/format_utils'
import '../../../../scss/screenings/ScreeningsPosterView.scss'
import { Link } from 'react-router-dom'
import { Movie } from '../../../../domain/interfaces/Movie'
import { Screening } from '../../../../domain/interfaces/Screening'

interface ScreeningPosterContainerProps {
  movie: Movie
  screenings: Screening[]
}

export const ScreeningPosterContainer = ({ movie, screenings }: ScreeningPosterContainerProps) => {

  return (
    <Link to={`/book/${movie.id}`} className='poster-screening'>
      <img draggable="false" src={`assets${movie.description.posterImage}`} alt={movie.title} />
      <div className='poster-screening-metadata'>
        <p className='poster-screening-title'>{movie.title}</p>
        <p className='poster-screening-date'>{
         screenings && (
          new Date(screenings[0].time).toLocaleString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
          })
         )
        }</p>
        <p className='poster-screening-runtime'>
          <span style={{paddingRight: '5px'}}><FontAwesomeIcon icon={faClock}/></span>
          {formatMinutes(movie.description.length)}
        </p>
        <div className="poster-screening-categories">
          {movie.description.categories.map((category, index) => {
            return (<p key={index.toString()} className='poster-screening-category'>#{category}</p>
            );
          })}
        </div>
      </div>
    </Link>
  )
}