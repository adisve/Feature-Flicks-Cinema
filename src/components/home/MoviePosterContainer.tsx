import React from 'react'
import { Container } from 'react-bootstrap'
import { formatMinutes } from '../../data/utils/format_utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { Movie } from '../../domain/interfaces/Movie'
import { Link } from 'react-router-dom'

interface MoviePosterContainerProps {
  movie: Movie
}

/**
 * Renders a poster for a movie. The poster is rendered as an image
 * with the name of the movie, and the movie's runtime in minutes.
 * @returns: A poster for a movie.
 */
export const MoviePosterContainer = ({ movie }: MoviePosterContainerProps) => {
  return (
    <Link to={`/book/${movie.id}`}>
      <Container className='text-center mb-5 featured-movie'>
      <img draggable="false" src={`assets${movie.description.posterImage}`} alt={movie.title} />
      <Container className='featured-movie-info-container'>
        <p className='featured-movie-title'>{movie.title}</p>
        <p className='featured-movie-length'><span><FontAwesomeIcon icon={faClock}/></span>{formatMinutes(movie.description.length)}</p>
        <div className='featured-movie-categories'>{
          movie.description.categories.map((category, index) => {
            return <p key={index.toString()} className='featured-movie-category-container'>#{category}</p>
          })
        }</div>
      </Container>
    </Container>
    </Link>
  )
}