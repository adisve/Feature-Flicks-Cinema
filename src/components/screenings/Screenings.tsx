import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import { Movie } from '../../domain/models/Movie';
import { Loading } from '../home/Loading';
import '../../scss/Screenings.scss';
import { ScreeningItem } from './ScreeningItem';
import { 
  fetchMovies, 
  fetchScreenings, 
  mapMoviesDataToModel, 
  sortMoviesByScreeningDate } from '../../data/services/movie_service'
import { ErrorMessage } from '../errors/ErrorMessage';

/**
 * Component that renders the screenings list.
 * On each render, it fetches the list of screenings from the API.
 * @returns: a list of screenings
 */
export const Screenings = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  return (
    <div className='screenings'>
        {error ? (
          <ErrorMessage />
        ) : (
          <ListGroup variant='flush'>
            {
              movies.length > 0 ? (
                movies.map((movie) => {
                  return <ScreeningItem key={movie.id} movie={movie} />
                })
              ) : <Loading />
            }
          </ListGroup>
        )}
      </div>
  );


  function fetchDataAndUpdateState() {
    Promise.all([
      fetchMovies(),
      fetchScreenings(),
    ])
      .then((responses) => {
        const moviesData = responses[0];
        const screeningsData = responses[1];

        const movies: Movie[] = mapMoviesDataToModel(moviesData, screeningsData);
        const sortedMovies: Movie[] = sortMoviesByScreeningDate(movies);

        setMovies(sortedMovies);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }
};
