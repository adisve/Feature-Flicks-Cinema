import { createRequestURL, get } from '../axios/network_manager'
import { moviesURL, screeningsURL } from '../configuration/config_url'
import { Movie } from '../../domain/models/Movie'
import { mapToMovies } from '../utils/mapping_utils'
import { checkStatus } from '../axios/middleware_functons';

export const fetchMovies = async (): Promise<any> => {
  try {
        const response = await get(createRequestURL(moviesURL, { sort: "title" }));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Request timed out');
    }
};

export const fetchScreenings = async (): Promise<any> => {
  try {
        const response = await get(screeningsURL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Request timed out');
    }
};

export const fetchHeroMovies = async (): Promise<any> => {
    try {
        const response_1 = await get(createRequestURL(moviesURL, { 'limit': 4, 'sort': '-title' }), [checkStatus]);
        return response_1.data;
    } catch (error) {
        console.error(error);
        throw new Error('Request timed out');
    }
  };

export const sortMoviesByScreeningDate = (movies: Movie[]): Movie[] => {
  return movies.sort((a, b) => a.screenings[0].getTime() - b.screenings[0].getTime());
};

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
