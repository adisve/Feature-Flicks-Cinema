import React from 'react'
import { Movie } from '../../domain/models/Movie';
import { ScreeningListItem } from './ScreeningListItem';

interface ScreeninsListViewProps {
  movies: Movie[];
}

export const ScreeningsListView: React.FC<ScreeninsListViewProps> = (props) => {
  return (
    <>
      {
        props.movies.map((movie) => {
          return <ScreeningListItem key={movie.id} movie={movie} />
        })
      }
    </>
  )
}
