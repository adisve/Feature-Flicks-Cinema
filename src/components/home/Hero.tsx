import React from 'react'
import '../../scss/Hero.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { MoviePosterContainer } from './MoviePosterContainer';
import { Loading } from '../animations/Loading';
import { ErrorMessage } from '../errors/ErrorMessage';
import { PageStatus } from '../../domain/enums/PageStatus';
import { useHero } from '../../data/hooks/useHero';

/**
 * Can be seen on the home/landing page, displaying
 * a collection of movies that the user can press and see.
 * @returns: Hero component
 */
export const Hero = () => {
  
  const [state, dispatch] = useHero();

  if (state.pageStatus === PageStatus.Loading) {
    return <Loading />;
  }

  if (state.pageStatus === PageStatus.Error) {
    return <ErrorMessage />
  }

  return (
    <div className='hero-list-container'>
      <header className='hero-list-container-content'>
      <>
        <h1>Escape reality, one flick at a time.</h1>
        <Container fluid className='featured-movies'>
          <Row>
          {
            state.heroMovies.map(movie => (
              <Col key={movie.id} xxl={3} xl={6} lg={6} md={6} sm={12}>
                <MoviePosterContainer movie={movie} />
              </Col>
            ))
          }
          </Row>
        </Container>
      </>
      </header>
    </div>
  );
};