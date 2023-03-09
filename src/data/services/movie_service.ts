import { createRequestURL, get } from '../axios/network_manager'
import { auditoriumsURL, categoriesURL, moviesURL, occupiedSeatsURL, screeningsURL, seatsPerAuditoriumURL, ticketTypesURL } from '../configuration/config_url'
import { checkStatus } from '../axios/middleware_functons';
import { Auditorium } from '../../domain/interfaces/Auditorium';
import { SeatsPerAuditorium } from '../../domain/interfaces/SeatsPerAuditorium';
import { Screening } from '../../domain/interfaces/Screening';
import { Movie } from '../../domain/interfaces/Movie';
import { TicketType } from '../../domain/interfaces/TicketType';
import { Category } from '../../domain/interfaces/Category';
import { AxiosResponse } from 'axios';

const fetchData = async <T>(url: string, middleware: ((response: AxiosResponse<T>) => AxiosResponse<T>)[]): Promise<T> => {
  try {
    const response = await get(url, middleware);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Request timed out');
  }
};

export const fetchMovies = async (): Promise<Movie[]> => {
  const url = createRequestURL(moviesURL, { sort: "title" });
  return await fetchData<Movie[]>(url, [checkStatus]);
};

export const fetchMovieById = async (movieId: string): Promise<Movie[]> => {
  const url = createRequestURL(moviesURL, { id: movieId });
  return await fetchData<Movie[]>(url, [checkStatus]);
};

export const fetchTicketTypes = async (): Promise<TicketType[]> => {
  return await fetchData<TicketType[]>(ticketTypesURL, [checkStatus]);
};

export const fetchAuditoriumById = async (screeningId: number): Promise<Auditorium[]> => {
  const url = createRequestURL(auditoriumsURL, { id: screeningId });
  return await fetchData<Auditorium[]>(url, [checkStatus]);
};

export const fetchOccupiedSeatsByMovieName = async (movieName: string): Promise<OccupiedSeats[]> => {
  const url = `${occupiedSeatsURL}?movie=${movieName}`;
  return await fetchData<OccupiedSeats[]>(url, [checkStatus]);
};

export const fetchScreeningsByMovieId = async (id: string): Promise<Screening[]> => {
  const url = createRequestURL(screeningsURL, { movieId: id });
  return await fetchData<Screening[]>(url, [checkStatus]);
};

export const fetchAuditoriums = async (): Promise<Auditorium[]> => {
  return await fetchData<Auditorium[]>(auditoriumsURL, [checkStatus]);
};

export const fetchSeatsPerAuditorium = async (): Promise<SeatsPerAuditorium[]> => {
  return await fetchData<SeatsPerAuditorium[]>(seatsPerAuditoriumURL, [checkStatus]);
};

export const fetchScreeningById = async (id: string): Promise<Screening[]> => {
  const url = createRequestURL(screeningsURL, { id: id });
  return await fetchData<Screening[]>(url, [checkStatus]);
};

export const fetchScreenings = async (): Promise<Screening[]> => {
  return await fetchData<Screening[]>(screeningsURL, [checkStatus]);
};

export const fetchCategories = async (): Promise<Category[]> => {
  return await fetchData<Category[]>(categoriesURL, [checkStatus]);
};

export const fetchHeroMovies = async (): Promise<Movie[]> => {
  const url = createRequestURL(moviesURL, { 'limit': 4, 'sort': '-title' });
  return await fetchData<Movie[]>(url, [checkStatus]);
};
