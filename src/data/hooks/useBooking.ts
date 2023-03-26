import { useEffect, useReducer, Dispatch, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  fetchMovieById, 
  fetchOccupiedSeatsByScreeningId, 
  fetchScreeningById, 
  fetchSeatsPerAuditoriumById, 
  fetchTicketTypes 
} from '../services/movie_service';
import { PageStatus } from '../../domain/enums/PageStatus';
import { Screening } from '../../domain/interfaces/Screening';
import { Movie } from '../../domain/interfaces/Movie';
import { TicketType } from '../../domain/interfaces/TicketType';
import { OccupiedSeats } from '../../domain/interfaces/OccupiedSeats';

type BookingState = {
  screening?: Screening;
  movie?: Movie;
  pageStatus: PageStatus;
  occupiedSeats?: OccupiedSeats;
  ticketTypes?: TicketType[];
  selectedSeats?: {[id: number]: TicketType};
};

type BookingAction =
  | { type: "setScreening"; screening: Screening }
  | { type: "setMovie"; movie: Movie }
  | { type: "setPageStatus"; pageStatus: PageStatus }
  | { type: "setOccupiedSeats"; occupiedSeats: OccupiedSeats; }
  | { type: "setTicketTypes"; ticketTypes: TicketType[]; }
  | { type: "setSelectedSeats"; selectedSeats: {[id: number]: TicketType} };


type BookingDispatch = Dispatch<BookingAction>;

const initialState: BookingState = {
  screening: undefined,
  movie: undefined,
  pageStatus: PageStatus.Loading,
  occupiedSeats: undefined,
  ticketTypes: undefined,
  selectedSeats: {},
};

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case "setScreening":
      return { ...state, screening: action.screening };
    case "setMovie":
      return { ...state, movie: action.movie };
    case "setPageStatus":
      return { ...state, pageStatus: action.pageStatus };
    case "setOccupiedSeats":
      return {...state, occupiedSeats: action.occupiedSeats };
    case "setTicketTypes":
      return {...state, ticketTypes: action.ticketTypes };
    case "setSelectedSeats":
      return {...state, selectedSeats: action.selectedSeats };
    default:
      return state;
  }
};


export function useBooking(): [BookingState, BookingDispatch] {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  useEffect(() => {
    if (id) {
      fetchScreeningById(id)
        .then((screenings: Screening[]) => {
          dispatch({ type: "setScreening", screening: screenings[0] });
        })
        .catch((err: Error) => {
          console.log(err);
          dispatch({ type: "setPageStatus", pageStatus: PageStatus.Error });
        });
    }
  }, [id]);

  useEffect(() => {
    if (state.screening) {
      fetchMovieById(state.screening.movieId.toString())
        .then((movies: Movie[]) => {
          dispatch({ type: "setMovie", movie: movies[0] });
        })
        .catch((err: Error) => {
          console.log(err);
          dispatch({ type: "setPageStatus", pageStatus: PageStatus.Error });
        });
    }
  }, [state.screening]);

  useEffect(() => {
    if (id && state.movie) {
      Promise.all([
        fetchOccupiedSeatsByScreeningId(id),
        fetchTicketTypes()
      ]).then(([occupiedSeatsData, ticketTypesData]) => {
        const occupiedSeatsForMovieScreening = occupiedSeatsData[0];
        console.log(occupiedSeatsForMovieScreening)
        const ticketTypes: TicketType[] = [];
        ticketTypesData.forEach((ticketType: TicketType) => {
          ticketTypes.push(ticketType);
        });
        // Update state
        dispatch({ type: "setSelectedSeats", selectedSeats: {} })
        dispatch({ type: "setOccupiedSeats", occupiedSeats: occupiedSeatsForMovieScreening });
        dispatch({ type: "setPageStatus", pageStatus: PageStatus.Success });
        dispatch({ type: "setTicketTypes", ticketTypes });
      });
    }
  }, [state.movie]);

  return [state, dispatch];
}
