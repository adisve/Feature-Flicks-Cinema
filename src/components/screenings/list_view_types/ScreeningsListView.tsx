import React from 'react';
import { ScreeningListContainer } from './containers/ScreeningListContainer';
import { Screening } from '../../../domain/interfaces/Screening';
import { Movie } from '../../../domain/interfaces/Movie';

interface ScreeningsListViewProps {
  movies: Movie[];
  screenings: Screening[];
}

export const ScreeningsListView: React.FC<ScreeningsListViewProps> = (props) => {

  // Function to get the first screening date for a movie
  const getFirstScreeningDate = (movie: Movie, screenings: Screening[]): Date | null => {
    const movieScreenings = screenings.filter((screening) => screening.movieId === movie.id);
    if (movieScreenings.length > 0) {
      return new Date(movieScreenings[0].time);
    }
    return null;
  }

  // Sort the movies by the first screening date
  const sortedMovies = [...props.movies].sort((leftMovie, rightMovie) => {
    const leftMovieScreening = getFirstScreeningDate(leftMovie, props.screenings);
    const rightMovieScreening = getFirstScreeningDate(rightMovie, props.screenings);
    if (leftMovieScreening && rightMovieScreening) {
      return leftMovieScreening.getTime() - rightMovieScreening.getTime();
    } else if (leftMovieScreening) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <>
      {sortedMovies.map((movie) => (
        <ScreeningListContainer
          key={movie.id}
          movie={movie}
          screenings={props.screenings.filter((screening) => screening.movieId === movie.id)}
        />
      ))}
    </>
  );
};
