import React from 'react'
import { Movie } from '../../domain/models/Movie'
import { Col, Container } from 'react-bootstrap'

interface MoviePosterContainerProps {
  movie: Movie
}

export const MoviePosterContainer: React.FC<MoviePosterContainerProps> = (props) => {
  return (
    <div className='text-center'>
      <img key={props.movie.id} src={`assets${props.movie.posterImage}`} alt={props.movie.title} />
      <Container className='featured-movie-info-container'>
        <p id='featured-movie-title'>{props.movie.title}</p>
        <ul className='fetured-movie-categories me-4 justify-content-center'>{
          props.movie.categories.map((category) => {
            return <li key={category}>
              <Container className='featured-movie-category-container'>#{category}</Container>
            </li>
          })
        }</ul>
      </Container>
    </div>
  )
}