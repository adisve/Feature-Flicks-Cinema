import React from 'react'
import { Movie } from '../../domain/models/Movie'
import { Container } from 'react-bootstrap'
import { formatMinutes } from '../../data/utils/format_utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

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
      <img src={`assets${props.movie.posterImage}`} alt={props.movie.title} />
      <Container className='featured-movie-info-container'>
        <p className='featured-movie-title'>{props.movie.title}</p>
        <p className='featured-movie-length'><span><FontAwesomeIcon icon={faClock}/></span>{formatMinutes(props.movie.length)}</p>
        <div className='fetured-movie-categories'>{
          props.movie.categories.map((category, index) => {
            return <p key={index.toString()} className='featured-movie-category-container'>#{category}</p>
          })
        }</div>
      </Container>
    </Container>
  )
}