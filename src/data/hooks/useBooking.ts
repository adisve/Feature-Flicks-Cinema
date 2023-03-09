import { useEffect, useReducer, Dispatch, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieById, fetchScreeningById, fetchTicketTypes } from '../services/movie_service';
import { mapToMovie, mapToScreening, mapToTicketTypes } from '../utils/mapping_utils';
import { PageStatus } from '../../components/App';
import { Screening } from '../../domain/models/Screening';
import { Movie } from '../../domain/models/Movie';
import { TicketType } from '../../domain/models/TicketType';
import { TicketSelection } from '../../domain/models/TicketSelection';

type BookingState = {
  screening?: Screening;
  movie?: Movie;
  pageStatus: PageStatus;
  ticketSelection?: {[id: string]: TicketSelection};
};

type BookingAction =
  | { type: "setScreening"; screening: Screening }
  | { type: "setMovie"; movie: Movie }
  | { type: "setPageStatus"; pageStatus: PageStatus }
  | { type: "setTicketSelection"; ticketSelection: {[id: string]: TicketSelection} }
  | { type: "updateTicketQuantity"; ticketName: string; quantity: number };


type BookingDispatch = Dispatch<BookingAction>;

const initialState: BookingState = {
  screening: undefined,
  movie: undefined,
  pageStatus: PageStatus.Loading,
  ticketSelection: undefined
};

const bookingReducer = (state: BookingState, action: BookingAction): BookingState => {
  switch (action.type) {
    case "setScreening":
      return { ...state, screening: action.screening };
    case "setMovie":
      return { ...state, movie: action.movie };
    case "setPageStatus":
      return { ...state, pageStatus: action.pageStatus };
    case "setTicketSelection":
      return { ...state, ticketSelection: action.ticketSelection };
    case "updateTicketQuantity":
      const { ticketName, quantity } = action;
      if (!state.ticketSelection) return state;
      return {
        ...state,
        ticketSelection: {
          ...state.ticketSelection,
          [ticketName]: {
            ...state.ticketSelection[ticketName],
            quantity
          }
        }
      };
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
        .then((screeningData: any) => {
          dispatch({ type: "setScreening", screening: mapToScreening(screeningData[0]) });
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
        .then((movieData: any) => {
          dispatch({ type: "setMovie", movie: mapToMovie(movieData[0]) });
        })
        .catch((err: Error) => {
          console.log(err);
          dispatch({ type: "setPageStatus", pageStatus: PageStatus.Error });
        });
    }
  }, [state.screening]);

  useEffect(() => {
    if (state.movie) {
      fetchTicketTypes().then((ticketsData: any) => {
        const tickets: TicketType[] = mapToTicketTypes(ticketsData);
        const ticketSelections: {[id: string]: TicketSelection} = {};
        tickets.forEach((ticketType: TicketType) => {
          ticketSelections[ticketType.name] = new TicketSelection(
            ticketType,
            0
          );
        });
        dispatch({ type: "setTicketSelection", ticketSelection: ticketSelections });
        dispatch({ type: "setPageStatus", pageStatus: PageStatus.Success });
      });
    }
  }, [state.movie]);

  return [state, dispatch];
}

