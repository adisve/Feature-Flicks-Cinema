import React, { useEffect, useState } from 'react';
import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Movie } from '../../domain/models/Movie';
import { Loading } from '../home/Loading';
import '../../scss/Screenings.scss';
import { ScreeningItem } from './ScreeningItem';
import { 
  fetchMovies, 
  fetchScreenings, 
  mapMoviesDataToModel, 
  sortMoviesByCategory, 
  sortMoviesByScreeningDate } from '../../data/services/movie_service'
import { ErrorMessage } from '../errors/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

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
        <div>
          <div className='d-flex justify-content-between filter-div'>
            <h2 id='available-screenings'>Available Screenings</h2>
            <div className="d-flex"><span><FontAwesomeIcon icon={faFilter} /></span><p>Filters</p></div>
          </div>
          <ListGroup variant='flush'>
            {movies.length > 0 ? (
              movies.map((movie) => {
                return <ScreeningItem key={movie.id} movie={movie} />
              })
            ) : <Loading />}
          </ListGroup>
        </div>
      )}
    </div>
  );


  function fetchDataAndUpdateState() {
    Promise.all([
      fetchMovies(),
      fetchScreenings(),
    ])
      .then((responses) => {
        const movies = responses[0];
        const screeningsData = responses[1];
        const moviesAndScreenings: Movie[] = mapMoviesDataToModel(movies, screeningsData);
        const sortedMovies: Movie[] = sortMoviesByScreeningDate(moviesAndScreenings);
        setMovies(sortedMovies);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }
};
