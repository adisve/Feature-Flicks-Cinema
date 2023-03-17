import { useEffect, useReducer, Dispatch, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  fetchMovieById, 
  fetchOccupiedSeatsByMovieName, 
  fetchScreeningById, 
  fetchSeatsPerAuditoriumById, 
  fetchTicketTypes 
} from '../services/movie_service';
import { PageStatus } from '../../domain/enums/PageStatus';
import { Screening } from '../../domain/interfaces/Screening';
import { Movie } from '../../domain/interfaces/Movie';
import { TicketSelection } from '../../domain/models/TicketSelection';
import { TicketType } from '../../domain/interfaces/TicketType';
import { SeatsPerAuditorium } from '../../domain/interfaces/SeatsPerAuditorium';
import { OccupiedSeats } from '../../domain/interfaces/OccupiedSeats';

type BookingState = {
  screening?: Screening;
  movie?: Movie;
  pageStatus: PageStatus;
  ticketSelection?: {[id: string]: TicketSelection};
  seatsPerAuditorium?: SeatsPerAuditorium;
  occupiedSeats?: OccupiedSeats;
  selectedSeats?: {[id: number]: TicketType};
  availableSeats: number[];
};

type BookingAction =
  | { type: "setScreening"; screening: Screening }
  | { type: "setMovie"; movie: Movie }
  | { type: "setPageStatus"; pageStatus: PageStatus }
  | { type: "setTicketSelection"; ticketSelection: {[id: string]: TicketSelection} }
  | { type: "updateTicketQuantity"; ticketName: string; quantity: number }
  | { type: "setAuditorium"; seatsPerAuditorium: SeatsPerAuditorium }
  | { type: "setOccupiedSeats"; occupiedSeats: OccupiedSeats; }
  | { type: "setSelectedSeats"; selectedSeats: {[id: number]: TicketType} }
  | { type: "setAvailableSeats"; availableSeats: number[]; };


type BookingDispatch = Dispatch<BookingAction>;

const initialState: BookingState = {
  screening: undefined,
  movie: undefined,
  pageStatus: PageStatus.Loading,
  ticketSelection: undefined,
  seatsPerAuditorium: undefined,
  occupiedSeats: undefined,
  selectedSeats: {},
  availableSeats: []
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
      return {...state, seatsPerAuditorium: action.seatsPerAuditorium };
    case "setOccupiedSeats":
      return {...state, occupiedSeats: action.occupiedSeats };
    case "setSelectedSeats":
      return {...state, selectedSeats: action.selectedSeats };
    case "setAvailableSeats":
      return {...state, availableSeats: action.availableSeats };
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
          fetchSeatsPerAuditoriumById(screenings[0].auditoriumId)
            .then((seatsPerAuditorium: SeatsPerAuditorium[]) => {
            dispatch({ type: "setAuditorium", seatsPerAuditorium: seatsPerAuditorium[0] });
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
  }, [state.seatsPerAuditorium]);

  useEffect(() => {
    if (state.movie && state.seatsPerAuditorium) {
      Promise.all([
        fetchOccupiedSeatsByMovieName(state.movie.title),
        fetchTicketTypes()
      ]).then(([occupiedSeatsData, ticketTypesData]) => {
        const occupiedSeatsForMovieScreening = occupiedSeatsData[0];
        const ticketSelections: {[id: string]: TicketSelection} = {};
        ticketTypesData.forEach((ticketType: TicketType) => {
          ticketSelections[ticketType.name] = new TicketSelection(
            ticketType,
            0
          );
        });
        const occupiedSeatsArray = occupiedSeatsForMovieScreening.occupiedSeats.split(',').map((seats) => parseInt(seats, 10));
        const availableSeats = Array.from(Array(state.seatsPerAuditorium!.numberOfSeats), (_, index) => index + 1)
          .filter((seatNumber) => !occupiedSeatsArray.includes(seatNumber));
        // Update state
        dispatch({ type: "setAvailableSeats", availableSeats: availableSeats });
        dispatch({ type: "setTicketSelection", ticketSelection: ticketSelections });
        dispatch({ type: "setOccupiedSeats", occupiedSeats: occupiedSeatsForMovieScreening });
        dispatch({ type: "setPageStatus", pageStatus: PageStatus.Success });
      });
    }
  }, [state.movie]);

  return [state, dispatch];
}
