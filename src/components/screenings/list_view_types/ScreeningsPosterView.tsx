import React from 'react'
import { Movie } from '../../../domain/models/Movie';
import { Col, Container, Row } from 'react-bootstrap';
import { ScreeningPosterContainer } from './containers/ScreeningPosterContainer';

interface ScreeningsPosterViewProps {
  movies: Movie[];
}

export const ScreeningsPosterView: React.FC<ScreeningsPosterViewProps> = (props) => {

  return (
    <Container className='screenings-poster-view'>
      <Row className='m-auto'>
        {props.movies.map((movie) => (
          <Col key={movie.id} xxl={3} xl={6} lg={6} md={6} sm={12}>
            <ScreeningPosterContainer movie={movie} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
