import React, { useEffect, useState } from 'react'
import '../../scss/Hero.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { get, createRequestURL } from '../../data/axios/network_manager';
import { checkStatus } from '../../data/axios/middleware_functons';
import { moviesURL } from '../../data/configuration/config_url';
import { Movie } from '../../domain/models/Movie';
import { MoviePosterContainer } from './MoviePosterContainer';
import { mapToMovies } from '../../data/utils/mapping_utils';
import { Loading } from './Loading';

/**
 * Can be seen on the home/landing page, displaying
 * a collection of movies that the user can press and see.
 * @returns: Hero component
 */
export const Hero = () => {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);

  useEffect(() => {
    get(createRequestURL(moviesURL, {'limit' : 4, 'sort' : '-title'}), [checkStatus])
      .then(response => {
        const movies: any[] = response.data;
        setHeroMovies(mapToMovies(movies));
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='hero-list-container'>
      <header className='hero-list-container-content'>
        <h1>Escape reality, one flick at a time.</h1>
        <Container fluid className='featured-movies'>
          <Row>
          {
            heroMovies.length > 0 ? (<>
              {heroMovies.map(movie => (
                <Col key={movie.id} xxl={3} xl={6} lg={6} md={6} sm={12}>
                  <MoviePosterContainer movie={movie} />
                </Col>
              ))}
            </>) : <div className='loading-container'><Loading></Loading></div>
          }
          </Row>
        </Container>
      </header>
    </div>
  );
}
