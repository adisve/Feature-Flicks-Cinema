import React, { useEffect, useState } from 'react'
import '../../scss/Hero.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { get } from '../../data/axios/network_manager';
import { checkStatus } from '../../data/axios/middleware_functons';
import { moviesURL } from '../../data/configuration/config_url';
import { Movie } from '../../domain/models/Movie';
import { MoviePosterContainer } from './MoviePosterContainer';
import { mapToMovies } from '../../data/utils/mapping_utils';
import { shuffle } from '../../data/utils/list_utils';
import { Loading } from './Loading';

export const Hero = () => {
  const [heroMovies, setHeroMovies] = useState<Movie[]>([]);

  useEffect(() => {
    get(moviesURL, [checkStatus])
      .then(response => {
        const movies: any[] = response.data;
        setHeroMovies(shuffle(mapToMovies(movies)));
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='hero'>
      <header className='hero-content'>
        <h1>Escape reality, one film at a time.</h1>
        <Container fluid className='featured-movies'>
          <Row>
          {
            heroMovies.length > 0 ? (<>
              {heroMovies.map(movie => (
                <Col key={movie.id} xl={3} lg={6} md={6} sm={12}>
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
