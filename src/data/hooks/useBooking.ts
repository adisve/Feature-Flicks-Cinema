import { useEffect, useReducer, Dispatch, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAuditoriumById, fetchAuditoriums, fetchMovieById, fetchScreeningById, fetchTicketTypes } from '../services/movie_service';
import { PageStatus } from '../../components/App';
import { Screening } from '../../domain/interfaces/Screening';
import { Movie } from '../../domain/interfaces/Movie';
import { TicketSelection } from '../../domain/models/TicketSelection';
import { TicketType } from '../../domain/interfaces/TicketType';
import { Auditorium } from '../../domain/interfaces/Auditorium';

type BookingState = {
  screening?: Screening;
  movie?: Movie;
  pageStatus: PageStatus;
  ticketSelection?: {[id: string]: TicketSelection};
  auditorium?: Auditorium;
};

type BookingAction =
  | { type: "setScreening"; screening: Screening }
  | { type: "setMovie"; movie: Movie }
  | { type: "setPageStatus"; pageStatus: PageStatus }
  | { type: "setTicketSelection"; ticketSelection: {[id: string]: TicketSelection} }
  | { type: "updateTicketQuantity"; ticketName: string; quantity: number }
  | { type: "setAuditorium"; auditorium: Auditorium };


type BookingDispatch = Dispatch<BookingAction>;

const initialState: BookingState = {
  screening: undefined,
  movie: undefined,
  pageStatus: PageStatus.Loading,
  ticketSelection: undefined,
  auditorium: undefined
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
    case "setAuditorium":
      return {...state, auditorium: action.auditorium };
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
        .then((screenings: Screening[]) => {
          dispatch({ type: "setScreening", screening: screenings[0] });
          fetchAuditoriumById(screenings[0].auditoriumId).then((auditoriums: Auditorium[]) => {
            dispatch({ type: "setAuditorium", auditorium: auditoriums[0] });
          })
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
  }, [state.auditorium]);

  useEffect(() => {
    if (state.movie) {
      fetchTicketTypes().then((ticketTypes: TicketType[]) => {
        const ticketSelections: {[id: string]: TicketSelection} = {};
        ticketTypes.forEach((ticketType: TicketType) => {
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

