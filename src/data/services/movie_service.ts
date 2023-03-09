import { createRequestURL, get } from '../axios/network_manager'
import { auditoriumsURL, categoriesURL, moviesURL, occupiedSeatsURL, screeningsURL, seatsPerAuditoriumURL, ticketTypesURL } from '../configuration/config_url'
import { checkStatus } from '../axios/middleware_functons';
import { Auditorium } from '../../domain/interfaces/Auditorium';
import { SeatsPerAuditorium } from '../../domain/interfaces/SeatsPerAuditorium';
import { Screening } from '../../domain/interfaces/Screening';
import { Movie } from '../../domain/interfaces/Movie';
import { TicketType } from '../../domain/interfaces/TicketType';
import { Category } from '../../domain/interfaces/Category';

/**
 * Fetches movies from the server in sorted order, based on title.
 * @returns Promise
 */
export const fetchMovies = async (): Promise<Movie[]> => {
  try {
    const response = await get(createRequestURL(moviesURL, { sort: "title" }), [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
};

export const fetchMovieById = async (movieId: string): Promise<Movie[]> => {
  try {
    const response = await get(createRequestURL(moviesURL, { id: movieId }), [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

export const fetchTicketTypes = async (): Promise<TicketType[]> => {
  try {
    const response = await get(ticketTypesURL, [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

export const fetchOccupiedSeatsByMovieName = async (movieName: string): Promise<OccupiedSeats[]> => {
  try {
    const url = `${occupiedSeatsURL}?movie=${movieName}`;
    const response = await get(url, [checkStatus]);
return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

export const fetchScreeningsByMovieId = async (id: string): Promise<Screening[]> => {
  try {
    const response = await get(createRequestURL(screeningsURL, { movieId: id }), [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

export const fetchAuditoriums = async (): Promise<Auditorium[]> => {
  try {
    const response = await get(auditoriumsURL, [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

export const fetchSeatsPerAuditorium = async (): Promise<SeatsPerAuditorium[]> => {
  try {
    const response = await get(seatsPerAuditoriumURL, [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

export const fetchScreeningById = async (id: string): Promise<Screening[]> => {
  try {
    const response = await get(createRequestURL(screeningsURL, { id: id }), [checkStatus]);
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
export const fetchScreenings = async (): Promise<Screening[]> => {
  try {
    const response = await get(screeningsURL, [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await get(categoriesURL, [checkStatus]);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
}

/**
 * Fetches movies from the server specifically for the hero section,
 * as it only retrieves 4 movies at a time.
 * @returns Promise
 */
export const fetchHeroMovies = async (): Promise<Movie[]> => {
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
export const sortMoviesByScreeningDate = (screenings: Screening[]): Screening[] => {
  return screenings.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
};