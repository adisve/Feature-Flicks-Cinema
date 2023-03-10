import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { ScreeningPosterContainer } from './containers/ScreeningPosterContainer';
import { Movie } from '../../../domain/interfaces/Movie';
import { Screening } from '../../../domain/interfaces/Screening';

interface ScreeningsPosterViewProps {
  movies: Movie[];
  screenings: Screening[];
}

export const ScreeningsPosterView = ({ movies, screenings }: ScreeningsPosterViewProps) => {

  return (
    <Container className='screenings-poster-view'>
      <Row className='m-auto'>
        {movies.map((movie) => (
          <Col key={movie.id} xxl={3} xl={6} lg={6} md={6} sm={12}>
            <ScreeningPosterContainer 
              movie={movie}
              screenings={screenings.filter((screening) => screening.movieId === movie.id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
