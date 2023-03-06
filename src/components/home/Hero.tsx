import React, { useEffect, useState } from 'react'
import '../../scss/Hero.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { Movie } from '../../domain/models/Movie';
import { MoviePosterContainer } from './MoviePosterContainer';
import { Loading } from './Loading';
import { fetchHeroMovies, mapMoviesDataToModel } from '../../data/services/movie_service';
import { ErrorMessage } from '../errors/ErrorMessage';
import { pageState } from '../App';

/**
 * Can be seen on the home/landing page, displaying
 * a collection of movies that the user can press and see.
 * @returns: Hero component
 */
export const Hero = () => {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);
  const [pageStatus, setPageStatus] = useState(pageState.LOADING);

  useEffect(() => {
    fetchHeroMovies()
      .then((moviesData) => {
        const movies: Movie[] = mapMoviesDataToModel(moviesData);
        setHeroMovies(movies);
        setPageStatus(pageState.SUCCESS);
      })
      .catch((error) => {
        setPageStatus(pageState.ERROR);
      });
  }, []);

  if (pageStatus === pageState.LOADING) {
    return <div className="text-center m-5"><Loading /></div>;
  }

  if (pageStatus === pageState.ERROR) {
    return <div className="text-center m-5"><ErrorMessage /></div>
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