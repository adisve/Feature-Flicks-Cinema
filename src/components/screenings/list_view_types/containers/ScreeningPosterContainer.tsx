import React from 'react'
import { Movie } from '../../../../domain/models/Movie'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { formatMinutes } from '../../../../data/utils/format_utils'
import '../../../../scss/ScreeningsPosterView.scss'
import { Link, useNavigate } from 'react-router-dom'

interface ScreeningPosterContainerProps {
  movie: Movie
}

export const ScreeningPosterContainer: React.FC<ScreeningPosterContainerProps> = (props) => {

  return (
    <Link to={`/booking/${props.movie.id}`} className='poster-screening'>
      <img draggable="false" src={`assets${props.movie.posterImage}`} alt={props.movie.title} />
      <div className='poster-screening-metadata'>
        <p className='poster-screening-title'>{props.movie.title}</p>
        <p className='poster-screening-date'>{
         props.movie.screenings && (
          props.movie.screenings[0].time.toLocaleString('en-EN', {
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
          {formatMinutes(props.movie.length)}
        </p>
        <div className="poster-screening-categories">
          {props.movie.categories.map((category, index) => {
            return (<p key={index.toString()} className='poster-screening-category'>#{category}</p>
            );
          })}
        </div>
      </div>
    </Link>
  )
}