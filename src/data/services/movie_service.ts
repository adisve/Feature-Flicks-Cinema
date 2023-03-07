import { createRequestURL, get } from '../axios/network_manager'
import { moviesURL, screeningsURL } from '../configuration/config_url'
import { Movie } from '../../domain/models/Movie'
import { checkStatus } from '../axios/middleware_functons';

/**
 * Fetches movies from the server in sorted order, based on title.
 * @returns Promise
 */
export const fetchMovies = async (): Promise<any> => {
  try {
    const response = await get(createRequestURL(moviesURL, { sort: "title" }), [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
};

export const fetchMovieById = async (movieId: string): Promise<Movie> => {
  try {
    const response = await get(createRequestURL(moviesURL, { id: movieId }), [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

export const fetchScreeningById = async (id: string): Promise<any> => {
  try {
    const response = await get(createRequestURL(screeningsURL, { movieId: id }), [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

/**
 * Fetches screenings from the server in no particular order
 * @returns Promise
 */
export const fetchScreenings = async (): Promise<any> => {
  try {
    const response = await get(screeningsURL, [checkStatus]);
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
  return movies.sort((a, b) => a.screenings![0].time.getTime() - b.screenings![0].time.getTime());
};

/**
 * Sorts movies by category
 * @param movies 
 * @returns List of movies
 */
export const sortMoviesByCategory = (movies: Movie[]): Movie[] => {
  const categories: Set<string> = new Set<string>();
  movies.forEach((movie) => {
    movie.categories.forEach((category) => {
      categories.add(category);
    });
  });
  const sortedMovies: Movie[] = [];
  categories.forEach((category) => {
    const categoryMovies: Movie[] = movies.filter((movie) => movie.categories.includes(category));
    categoryMovies.forEach((movie) => {
      if (!sortedMovies.includes(movie)) {
        sortedMovies.push(movie);
      }
    });
  });
  return sortedMovies;
};
