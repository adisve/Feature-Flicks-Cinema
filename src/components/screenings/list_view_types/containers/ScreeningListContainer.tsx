import { faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { formatMinutes } from '../../../../data/utils/format_utils'
import '../../../../scss/screenings/ScreeningsListView.scss'
import { Link } from 'react-router-dom'
import { Movie } from '../../../../domain/interfaces/Movie'
import { Screening } from '../../../../domain/interfaces/Screening'

interface ScreeningListContainerProps {
  movie: Movie
  screenings: Screening[]
}

/**
 * This component renders a single screening item, which can
 * be viewed on the screening page in a list of available screenings.
 * @param  The specific movie contained in the screening item.
 * @returns: A screening item.
 */
export const ScreeningListContainer = ({ movie, screenings }: ScreeningListContainerProps) => {

  return (
    <Link to={`/book/${movie.id}`} className='screening-container'>
      <div className='screening-item'>
        <img draggable='false' src={`assets${movie.description.posterImage}`} alt={movie.title}></img>
        <div className='inner-screening-container'>
          <div className='screening-meta'>
            <h4>{movie.title}</h4>
            <div className='screening-category-container'>
              <div className='screening-categories'>
                {movie.description.categories.map((category, index) => {
                  return (<p key={index.toString()} className='screening-category'>#{category}</p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="text-end">
            <div className='screening-date-time-container'>
              <div className="d-flex">
                <h5>{
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
                }</h5>
              </div>
              <p className='screening-time'>
                <span style={{paddingRight: '10px'}}><FontAwesomeIcon icon={faClock}/></span>
                {formatMinutes(movie.description.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </Link>
  )
}

/**
 * 
 */