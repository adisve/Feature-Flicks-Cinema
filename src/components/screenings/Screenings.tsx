import React, { useEffect, useState } from 'react';
import { Movie } from '../../domain/models/Movie';
import { Loading } from '../animations/Loading';
import { useNavigate } from 'react-router-dom';
import '../../scss/screenings/Screenings.scss';
import '../../scss/Offcanvas.scss'
import { 
  fetchMovies, 
  fetchScreenings, 
  sortMoviesByScreeningDate } from '../../data/services/movie_service'
import { ErrorMessage } from '../errors/ErrorMessage';
import { PageStatus } from '../App';
import { ScreeningsHeader } from './ScreeningsHeader';
import { FilteringOffcanvas } from './FilteringOffcanvas';
import { ScreeningsList } from './ScreeningsList';
import { filterMoviesByCategories, getAvailableCategories, mapToMovies, mapToScreenings } from '../../data/utils/mapping_utils';
import { useScreenings } from '../../data/hooks/useScreenings';


interface ScreeningsState {
  pageStatus: PageStatus;
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
  const [state, dispatch] = useScreenings();

  const setViewType = (viewType: string) => {
    dispatch({ type: 'setViewType', viewType });
  };

  const setSelectedCategories = (selectedCategories: string[]) => {
    dispatch({ type: 'setSelectedCategories', selectedCategories });
  };

  const toggleOffcanvas = () =>
    dispatch({ type: 'setShowOffcanvas', showOffcanvas: !state.showOffcanvas });

    const handleCategoryClick = (category: string) => {
      const { selectedCategories } = state;
      if (selectedCategories.includes(category)) {
        dispatch({ type: "setSelectedCategories", selectedCategories: selectedCategories.filter((c) => c !== category) });
      } else {
        dispatch({ type: "setSelectedCategories", selectedCategories: [...selectedCategories, category] });
      }
    };
  
  
  if (state.pageStatus === PageStatus.Loading) {
    return <Loading />;
  }

  if (state.pageStatus === PageStatus.Error) {
    return <ErrorMessage />;
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
