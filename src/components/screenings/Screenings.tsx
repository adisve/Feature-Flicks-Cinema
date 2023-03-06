import React, { useEffect, useState } from 'react';
import { ListGroup, Dropdown, DropdownButton, Offcanvas, Badge } from 'react-bootstrap';
import { Movie } from '../../domain/models/Movie';
import { Loading } from '../home/Loading';
import '../../scss/Screenings.scss';
import '../../scss/Offcanvas.scss'
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
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchDataAndUpdateState();
  }, []);

  const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  const handleCategoryClick = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const filteredMovies = selectedCategories.length > 0
    ? movies.filter((movie) => selectedCategories.every((c) => movie.categories.includes(c)))
    : movies;
  
  const categories = Array.from(new Set(movies.flatMap((movie) => movie.categories)))
    .sort()
    .map((category) => {
      const count = filteredMovies.filter((movie) => movie.categories.includes(category)).length;
      return { category, count };
    });
  

  return (
    <div className='screenings'>
      {error ? (
        <ErrorMessage />
      ) : (
        <div>
          <div className='d-flex justify-content-between filter-div'>
            <h2 id='available-screenings'>Available Screenings</h2>
            <button onClick={toggleOffcanvas} className="d-flex btn"><span><FontAwesomeIcon icon={faFilter} /></span><p>Filters</p></button>
          </div>
          <ListGroup variant='flush'>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => {
                return <ScreeningItem key={movie.id} movie={movie} />
              })
            ) : <h1>No movies matching your criteria</h1>}
          </ListGroup>
          <Offcanvas placement='end' show={showOffcanvas} onHide={toggleOffcanvas}>
            <Offcanvas.Header>
              <button className='offcanvas-btn' onClick={toggleOffcanvas}>Done</button>
              <Offcanvas.Title>Filters</Offcanvas.Title>
              <button className='offcanvas-btn' onClick={() => setSelectedCategories([])}>Clear filters</button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <h5>Categories</h5>
            {categories.map(({ category, count }) => (
              <Badge
                bg={selectedCategories.includes(category) ? 'dark' : 'light'}
                key={category}
                className='m-1'
                onClick={() => handleCategoryClick(category)}
              >
                <p className={selectedCategories.includes(category) ? 'light-badge-font' : 'dark-badge-font'}>{`${category} `}<span>{`(${count})`}</span></p>
              </Badge>
            ))}
            </Offcanvas.Body>
          </Offcanvas>
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
