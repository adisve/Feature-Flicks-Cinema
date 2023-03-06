import React, { useEffect, useState } from 'react';
import { ListGroup, Dropdown, DropdownButton, Offcanvas, Badge, Button } from 'react-bootstrap';
import { Movie } from '../../domain/models/Movie';
import { Loading } from '../home/Loading';
import '../../scss/Screenings.scss';
import '../../scss/Offcanvas.scss'
import { ScreeningListItem } from './ScreeningListItem';
import { 
  fetchMovies, 
  fetchScreenings, 
  mapMoviesDataToModel, 
  sortMoviesByCategory, 
  sortMoviesByScreeningDate } from '../../data/services/movie_service'
import { ErrorMessage } from '../errors/ErrorMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faFilter, faImage, faList } from '@fortawesome/free-solid-svg-icons';
import { Categories } from './Categories';
import { ScreeningsListView } from './ScreeningsListView';
import { ScreeningsPosterView } from './ScreeningsPosterView';
import { pageState } from '../App';

/**
 * Component that renders the screenings list.
 * On each render, it fetches the list of screenings from the API.
 * @returns: a list of screenings
 */
export const Screenings = () => {
  const [pageStatus, setPageStatus] = useState(pageState.LOADING);
  const [viewType, setViewType] = useState('list');
  const [movies, setMovies] = useState<Movie[]>([]);
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
  
  if (pageStatus === pageState.LOADING) {
    return <div className='screenings'><Loading /></div>;
  }

  if (pageStatus === pageState.ERROR) {
    return <div className="screenings"><ErrorMessage /></div>;
  }

  return (
    <div className='screenings' >
      <div>
          <div className='justify-content-between screenings-header'>
            <h2 id='available-screenings'>Available Screenings</h2>
            <div className="d-flex view-types-filter">
              <div className='view-types'>
                <Button variant='custom'
                  onClick={() => setViewType('list')} 
                  className={`d-flex btn ${viewType === 'list' ? 'selected-view-type' : ''}`}>
                    <span><FontAwesomeIcon icon={faList} /></span><p>List</p></Button>
                <Button variant='custom'
                  onClick={() => setViewType('posters')} 
                  className={`d-flex btn ${viewType === 'posters' ? 'selected-view-type' : ''}`}>
                  <span><FontAwesomeIcon icon={faImage} /></span><p>Posters</p></Button>
              </div>
              <div>
                <Button onClick={toggleOffcanvas} variant='custom' className="d-flex btn"><span><FontAwesomeIcon icon={faFilter} /></span><p>Filters</p></Button>
              </div>
            </div>
          </div>
          <div className='screenings-list-parent'>
            <ul>
              {
                filteredMovies.length > 0 ?(
                  viewType === 'list' ? (<ScreeningsListView movies={filteredMovies} />) : <ScreeningsPosterView movies={filteredMovies}/>)
              : <h3>No movies matching your criteria</h3>
              }
            </ul>
          </div>
          <Offcanvas placement='end' show={showOffcanvas} onHide={toggleOffcanvas}>
            <Offcanvas.Header>
              <Button variant='custom' onClick={toggleOffcanvas}>Done</Button>
              <Offcanvas.Title>Filters</Offcanvas.Title>
              <Button variant='custom' onClick={() => setSelectedCategories([])}>Clear filters</Button>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Categories selectedCategories={selectedCategories} categories={categories} handleCategoryClick={handleCategoryClick} />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
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
        setPageStatus(pageState.SUCCESS);
      })
      .catch((error) => {
        console.error(error);
        setPageStatus(pageState.ERROR);
      });
  }
  
  
};
