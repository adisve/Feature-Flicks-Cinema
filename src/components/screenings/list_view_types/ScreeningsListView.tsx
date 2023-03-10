import React from 'react';
import { ScreeningListContainer } from './containers/ScreeningListContainer';
import { Screening } from '../../../domain/interfaces/Screening';
import { Movie } from '../../../domain/interfaces/Movie';

interface ScreeningsListViewProps {
  movies: Movie[];
  screenings: Screening[];
}

export const ScreeningsListView = ({ movies, screenings }: ScreeningsListViewProps) => {

  return (
    <>
      {movies.map((movie) => (
        <ScreeningListContainer
          key={movie.id}
          movie={movie}
          screenings={screenings.filter((screening) => screening.movieId === movie.id)}
        />
      ))}
    </>
  );
};
