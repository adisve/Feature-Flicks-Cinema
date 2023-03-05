import { faChevronCircleRight, faClock, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { formatMinutes } from '../../data/utils/format_utils'
import { Movie } from '../../domain/models/Movie'

interface ScreeningItemProps {
  movie: Movie
}

/**
 * This component renders a single screening item, which can
 * be viewed on the screening page in a list of available screenings.
 * @param props: The specific movie contained in the screening item.
 * @returns: A screening item.
 */
export const ScreeningItem: React.FC<ScreeningItemProps> = (props) => {
  return (
    <div className='screening-container'>
      <div className='screening-item'>
        <img src={`assets${props.movie.posterImage}`} alt='movie cover'></img>
        <div className='inner-screening-container'>
          <div className='screening-meta'>
            <h4>{props.movie.title}</h4>
            <div className='screening-category-length-container'>
              <div className='screening-categories'>
                {props.movie.categories.map((category, index) => {
                  return (<p key={index.toString()} className='screening-category'>{category}</p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='screening-book-tickets-container'>
            <h5>{
              props.movie.screenings[0].toLocaleString('se-SE', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })
            }</h5>
            <p className='screening-time'>
              <span style={{paddingRight: '10px'}}><FontAwesomeIcon icon={faClock}/></span>
              {formatMinutes(props.movie.length)}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

/**
 * 
 */