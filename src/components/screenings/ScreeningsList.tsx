import React from 'react'
import { Movie } from '../../domain/models/Movie'
import { ScreeningsListView } from './ScreeningsListView';
import { ScreeningsPosterView } from './ScreeningsPosterView';

interface ScreeningsListProps {
  filteredMovies: Movie[];
  viewType: string;
}

export const ScreeningsList: React.FC<ScreeningsListProps> = (props) => {
  return (
    <div className='screenings-list-parent'>
      <ul>
        {
          props.filteredMovies.length > 0 ?(
            props.viewType === 'list' ? (
            <ScreeningsListView movies={props.filteredMovies} />) 
            : <ScreeningsPosterView movies={props.filteredMovies}/>)
        : <h3>No movies matching your criteria</h3>
        }
      </ul>
    </div>
  )
}
