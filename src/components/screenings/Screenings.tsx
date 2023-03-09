import React, { useEffect, useState } from 'react';
import { Loading } from '../animations/Loading';
import { useNavigate } from 'react-router-dom';
import '../../scss/screenings/Screenings.scss';
import '../../scss/Offcanvas.scss'
import { ErrorMessage } from '../errors/ErrorMessage';
import { PageStatus } from '../../domain/enums/PageStatus';
import { ScreeningsHeader } from './ScreeningsHeader';
import { FilteringOffcanvas } from './FilteringOffcanvas';
import { ScreeningsList } from './ScreeningsList';
import { useScreenings } from '../../data/hooks/useScreenings';
import { filterMoviesByCategories, getAvailableCategories } from '../../data/utils/mapping_utils';

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
    // If the category is already selected, remove it
    if (selectedCategories.includes(category)) {
      dispatch({ 
        type: "setSelectedCategories", 
        selectedCategories: selectedCategories.filter((c) => c !== category) });
        // Update the dictionary of counts for each category
        const visibleCategoryCounts = getAvailableCategories(state.movies, filterMoviesByCategories(
          state.movies, 
          selectedCategories.filter((c) => c !== category)
        ));
        dispatch({ type: "setVisiblecategoryCounts", visibleCategoryCounts});
    } else {
      // Otherwise, add it
      dispatch({ 
        type: "setSelectedCategories", 
        selectedCategories: [...selectedCategories, category] });
      const visibleCategoryCounts = getAvailableCategories(state.movies, filterMoviesByCategories(
        state.movies, 
        [...selectedCategories, category]
      ));
      dispatch({ type: "setVisiblecategoryCounts", visibleCategoryCounts});
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
        screenings={state.screenings}
        viewType={state.viewType}
      />
      <FilteringOffcanvas
        showOffcanvas={state.showOffcanvas}
        toggleOffcanvas={toggleOffcanvas}
        selectedCategories={state.selectedCategories}
        categories={state.categories}
        setSelectedCategories={setSelectedCategories}
        handleCategoryClick={handleCategoryClick} 
        counts={state.visibleCategoryCounts}
      />
    </div>
  );
};
