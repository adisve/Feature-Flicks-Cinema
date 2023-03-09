import React from 'react'
import { Container } from 'react-bootstrap'
import { formatMinutes } from '../../data/utils/format_utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { Movie } from '../../domain/interfaces/Movie'

interface MoviePosterContainerProps {
  movie: Movie
}

/**
 * Renders a poster for a movie. The poster is rendered as an image
 * with the name of the movie, and the movie's runtime in minutes.
 * @returns: A poster for a movie.
 */
export const MoviePosterContainer: React.FC<MoviePosterContainerProps> = (props) => {
  return (
    <Container className='text-center mb-5 featured-movie'>
      <img draggable="false" src={`assets${props.movie.description.posterImage}`} alt={props.movie.title} />
      <Container className='featured-movie-info-container'>
        <p className='featured-movie-title'>{props.movie.title}</p>
        <p className='featured-movie-length'><span><FontAwesomeIcon icon={faClock}/></span>{formatMinutes(props.movie.description.length)}</p>
        <div className='featured-movie-categories'>{
          props.movie.description.categories.map((category, index) => {
            return <p key={index.toString()} className='featured-movie-category-container'>#{category}</p>
          })
        }</div>
      </Container>
    </Container>
  )
}