import { createRequestURL, get } from '../axios/network_manager'
import { moviesURL, screeningsURL } from '../configuration/config_url'
import { Movie } from '../../domain/models/Movie'
import { mapToMovies } from '../utils/mapping_utils'
import { checkStatus } from '../axios/middleware_functons';

/**
 * Fetches movies from the server in sorted order, based on title.
 * @returns Promise
 */
export const fetchMovies = async (): Promise<any> => {
  try {
        const response = await get(createRequestURL(moviesURL, { sort: "title" }));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Request timed out');
    }
};

/**
 * Fetches screenings from the server in no particular order
 * @returns Promise
 */
export const fetchScreenings = async (): Promise<any> => {
  try {
        const response = await get(screeningsURL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Request timed out');
    }
};

/**
 * Fetches movies from the server specifically for the hero section,
 * as it only retrieves 4 movies at a time.
 * @returns Promise
 */
export const fetchHeroMovies = async (): Promise<any> => {
    try {
        const response = await get(createRequestURL(moviesURL, { 'limit': 4, 'sort': '-title' }), [checkStatus]);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Request timed out');
    }
  };

/**
 * Sorts movies by their most recent screening date
 * @param movies 
 * @returns List of movies
 */
export const sortMoviesByScreeningDate = (movies: Movie[]): Movie[] => {
  return movies.sort((a, b) => a.screenings[0].getTime() - b.screenings[0].getTime());
};

/**
 * Maps the movies to a list of movies, along with each movie's available
 * screening dates as a list of dates, if the screenings are passed as well.
 * @param moviesData 
 * @param screeningsData 
 * @returns List of movies mapped to screenings if it is passed as parameter
 */
export const mapMoviesDataToModel = (moviesData: any[], screeningsData?: any[]): Movie[] => {
  const movies: Movie[] = mapToMovies(moviesData);
  const screeningsDict: { [id: number]: Date[] } = {};

  if (screeningsData) {
    screeningsData.forEach((screening) => {
        const movieId = screening.movieId;
        if (!screeningsDict[movieId]) {
          screeningsDict[movieId] = [];
        }
        screeningsDict[movieId].push(new Date(screening.time));
      });
  }

  movies.forEach((movie) => {
    if (screeningsDict[movie.id]) {
      movie.screenings = screeningsDict[movie.id];
    } else {
      movie.screenings = [];
    }
  });

  return movies;
};
