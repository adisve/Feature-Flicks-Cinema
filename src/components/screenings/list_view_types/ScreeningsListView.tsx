import React from 'react'
import { Movie } from '../../../domain/models/Movie';
import { ScreeningListContainer } from './containers/ScreeningListContainer';

interface ScreeninsListViewProps {
  movies: Movie[];
}

export const ScreeningsListView: React.FC<ScreeninsListViewProps> = (props) => {

  return (
    <>
      {
        props.movies.map((movie) => {
          return (
            <ScreeningListContainer
              key={movie.id} 
              movie={movie} 
            />)
        })
      }
    </>
  )
}
