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

export const ScreeningsList: React.FC<ScreeningsListProps> = (props) => {
  return (
    <div className='screenings-list-parent'>
      <ul>
        {
          props.filteredMovies.length > 0 ?(
            props.viewType === 'list' ? (
            <ScreeningsListView 
              movies={props.filteredMovies}
              screenings={props.screenings}
            />) 
            : <ScreeningsPosterView 
                movies={props.filteredMovies}
                screenings={props.screenings}
              />)
        : <h3>No movies matching your criteria</h3>
        }
      </ul>
    </div>
  )
}
