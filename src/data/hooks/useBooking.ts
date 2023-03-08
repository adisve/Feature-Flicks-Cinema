import { useState, useEffect, useReducer, Dispatch } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById, fetchScreeningById } from '../services/movie_service';
import { mapToMovie, mapToScreening } from '../utils/mapping_utils';
import { PageStatus } from '../../components/App';
import { TicketType } from '../../components/booking/book_screening/TicketSelectionAmountContainer';
import { Screening } from '../../domain/models/Screening';
import { Movie } from '../../domain/models/Movie';

type BookingState = {
  screening?: Screening;
  movie?: Movie;
  pageStatus: PageStatus;
  [TicketType.SENIOR]: number;
  [TicketType.CHILD]: number;
  [TicketType.REGULAR]: number;
};

type BookingAction =
  | { type: "setScreening"; screening: Screening }
  | { type: "setMovie"; movie: Movie }
  | { type: "setPageStatus"; pageStatus: PageStatus }
  | { type: "setTicketAmount"; ticketType: TicketType; amount: number };

type BookingDispatch = Dispatch<BookingAction>;

const initialState: BookingState = {
  screening: undefined,
  movie: undefined,
  pageStatus: PageStatus.LOADING,
  [TicketType.SENIOR]: 0,
  [TicketType.CHILD]: 0,
  [TicketType.REGULAR]: 0,
};

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case "setScreening":
      return { ...state, screening: action.screening };
    case "setMovie":
      return { ...state, movie: action.movie };
    case "setPageStatus":
      return { ...state, pageStatus: action.pageStatus };
    case "setTicketAmount":
      return { ...state, [action.ticketType]: action.amount };
    default:
      return state;
  }
}

export function useBooking(): [BookingState, BookingDispatch] {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    if (id) {
      fetchScreeningById(id)
        .then((screeningData: any) => {
          dispatch({ type: "setScreening", screening: mapToScreening(screeningData[0]) });
        })
        .catch((err: Error) => {
          console.log(err);
          dispatch({ type: "setPageStatus", pageStatus: PageStatus.ERROR });
        });
    }
  }, [id]);

  useEffect(() => {
    if (state.screening) {
      fetchMovieById(state.screening.movieId.toString())
        .then((movieData: any) => {
          console.log(movieData);
          dispatch({ type: "setMovie", movie: mapToMovie(movieData[0]) });
          dispatch({ type: "setPageStatus", pageStatus: PageStatus.SUCCESS });
        })
        .catch((err: Error) => {
          console.log(err);
          dispatch({ type: "setPageStatus", pageStatus: PageStatus.ERROR });
        });
    }
  }, [state.screening]);

  return [state, dispatch];
}
