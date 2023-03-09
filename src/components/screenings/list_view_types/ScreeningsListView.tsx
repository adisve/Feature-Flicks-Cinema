import React from 'react'
import { ScreeningListContainer } from './containers/ScreeningListContainer';
import { Movie } from '../../../domain/interfaces/Movie';
import { Screening } from '../../../domain/interfaces/Screening';

interface ScreeningsListViewProps {
  movies: Movie[];
  screenings: Screening[];
}

export const ScreeningsListView: React.FC<ScreeningsListViewProps> = (props) => {

  return (
    <>
      {
        props.movies.map((movie) => {
          return (
            <ScreeningListContainer
              key={movie.id} 
              movie={movie}
              screenings={props.screenings.filter((screening) => screening.movieId === movie.id)}
            />)
        })
      }
    </>
  )
}
