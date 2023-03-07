import React, { useEffect, useState } from 'react'
import '../../scss/Hero.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { Movie } from '../../domain/models/Movie';
import { MoviePosterContainer } from './MoviePosterContainer';
import { Loading } from '../animations/Loading';
import { fetchHeroMovies } from '../../data/services/movie_service';
import { ErrorMessage } from '../errors/ErrorMessage';
import { PageStatus } from '../App';
import { mapToMovies } from '../../data/utils/mapping_utils';

/**
 * Can be seen on the home/landing page, displaying
 * a collection of movies that the user can press and see.
 * @returns: Hero component
 */
export const Hero = () => {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [pageStatus, setPageStatus] = useState(PageStatus.LOADING);

  useEffect(() => {
    fetchHeroMovies()
      .then((moviesData) => {
        const movies: Movie[] = mapToMovies(moviesData);
        setHeroMovies(movies);
        setPageStatus(PageStatus.SUCCESS);
      })
      .catch((error) => {
        setPageStatus(PageStatus.ERROR);
      });
  }, []);

  if (pageStatus === PageStatus.LOADING) {
    return <Loading />;
  }

  if (pageStatus === PageStatus.ERROR) {
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
            heroMovies.map(movie => (
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