import React, { useEffect, useState } from 'react';
import { Movie } from '../../domain/models/Movie';
import { Loading } from '../home/Loading';
import { useNavigate } from 'react-router-dom';
import '../../scss/Screenings.scss';
import '../../scss/Offcanvas.scss'
import { 
  fetchMovies, 
  fetchScreenings, 
  sortMoviesByScreeningDate } from '../../data/services/movie_service'
import { ErrorMessage } from '../errors/ErrorMessage';
import { pageState } from '../App';
import { ScreeningsHeader } from './ScreeningsHeader';
import { FilteringOffcanvas } from './FilteringOffcanvas';
import { ScreeningsList } from './ScreeningsList';
import { filterMoviesByCategories, getAvailableCategories, mapToMovies, mapToScreenings } from '../../data/utils/mapping_utils';


interface ScreeningsState {
  pageStatus: pageState;
  viewType: string;
  movies: Movie[];
  showOffcanvas: boolean;
  selectedCategories: string[];
}

/**
 * Component that renders the screenings list.
 * On each render, it fetches the list of screenings from the API.
 * @returns: a list of screenings
 */
export const Screenings = () => {
  const [state, setState] = useState<ScreeningsState>({
    pageStatus: pageState.LOADING,
    viewType: 'list',
    movies: [],
    showOffcanvas: false,
    selectedCategories: [],
  });

  const setViewType = (viewType: string) => {
    setState((prevState) => ({ ...prevState, viewType }));
  };

  const setSelectedCategories = (categories: string[]) => {
    setState((prevState) => ({ ...prevState, selectedCategories: categories }));
  };

  const toggleOffcanvas = () =>
    setState((prevState) => ({ ...prevState, showOffcanvas: !prevState.showOffcanvas }));

  const handleCategoryClick = (category: string) => {
    setState((prevState) => {
      const { selectedCategories } = prevState;
      if (selectedCategories.includes(category)) {
        return { ...prevState, selectedCategories: selectedCategories.filter((c) => c !== category) };
      }
      return { ...prevState, selectedCategories: [...selectedCategories, category] };
    });
  };

  useEffect(() => {
    Promise.all([
      fetchMovies(),
      fetchScreenings(),
    ])
      .then((responses) => {
        const movieDataArray = responses[0];
        const screeningsData = responses[1];
        const screenings = mapToScreenings(screeningsData);
        const movies = mapToMovies(movieDataArray, screenings);
        const sortedMovies: Movie[] = sortMoviesByScreeningDate(movies);
        setState((prevState) => ({ ...prevState, movies: sortedMovies, pageStatus: pageState.SUCCESS }));
      })
      .catch((error) => {
        console.error(error);
        setState((prevState) => ({ ...prevState, pageStatus: pageState.ERROR }));
      });
  }, []);
  
  
  if (state.pageStatus === pageState.LOADING) {
    return <div className='screenings'><Loading /></div>;
  }

  if (state.pageStatus === pageState.ERROR) {
    return <div className="screenings"><ErrorMessage /></div>;
  }

  return (
    <div className="screenings">
      <ScreeningsHeader
        setViewType={setViewType}
        viewType={state.viewType}
        toggleOffcanvas={toggleOffcanvas}
      />
      <ScreeningsList
        filteredMovies={
          filterMoviesByCategories(
            state.movies, 
            state.selectedCategories
          )
        }
        viewType={state.viewType}
      />
      <FilteringOffcanvas
        showOffcanvas={state.showOffcanvas}
        toggleOffcanvas={toggleOffcanvas}
        selectedCategories={state.selectedCategories}
        categories={
          getAvailableCategories(
            state.movies, 
            filterMoviesByCategories(state.movies, state.selectedCategories)
          )
        }
        setSelectedCategories={setSelectedCategories}
        handleCategoryClick={handleCategoryClick}
      />
    </div>
  );
};
