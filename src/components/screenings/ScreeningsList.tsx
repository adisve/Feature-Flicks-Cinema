import React from 'react'
import { ScreeningsListView } from './list_view_types/ScreeningsListView';
import { ScreeningsPosterView } from './list_view_types/ScreeningsPosterView';
import { Movie } from '../../domain/interfaces/Movie';
import { Screening } from '../../domain/interfaces/Screening';

interface ScreeningsListProps {
  filteredMovies: Movie[];
  screenings: Screening[];
  viewType: string;
}

export const ScreeningsList = ({ 
  filteredMovies,
  screenings,
  viewType
 }: ScreeningsListProps) => {
  return (
    <div className='screenings-list-parent'>
      <ul>
        {
          filteredMovies.length > 0 ?(
            viewType === 'list' ? (
            <ScreeningsListView 
              movies={filteredMovies}
              screenings={screenings}
            />) 
            : <ScreeningsPosterView 
                movies={filteredMovies}
                screenings={screenings}
              />)
        : <h3>No movies matching your criteria</h3>
        }
      </ul>
    </div>
  )
}
