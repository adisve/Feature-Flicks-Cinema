import { useReducer, useEffect, Dispatch } from 'react';
import { PageStatus } from '../../domain/enums/PageStatus';
import { fetchAuditoriums, fetchMovieById, fetchOccupiedSeatsByMovieName, fetchScreeningsByMovieId, fetchSeatsPerAuditorium } from '../services/movie_service';
import { SeatsPerAuditorium } from '../../domain/interfaces/SeatsPerAuditorium';
import { Screening } from '../../domain/interfaces/Screening';
import { Movie } from '../../domain/interfaces/Movie';
import { Auditorium } from '../../domain/interfaces/Auditorium';
import { OccupiedSeats } from '../../domain/interfaces/OccupiedSeats';

interface SelectScreeningState {
  movie?: Movie;
  screenings?: Screening[];
  pageStatus: PageStatus;
  auditoriums: Auditorium[];
  seatsPerAuditorium?:  {[id: string] : SeatsPerAuditorium};
  occupiedSeats?: {[id: string] : number}
}

type SelectScreeningAction =
  | { type: 'setMovie'; movie: Movie }
  | { type: 'setScreenings'; screenings: Screening[] }
  | { type: 'setPageStatus'; pageStatus: PageStatus }
  | { type: 'setSeatsPerAuditorium'; seatsPerAuditorium: {[id: string] : SeatsPerAuditorium} }
  | { type: 'setOccupiedSeats'; occupiedSeats: {[id: string] : number} }
  | { type:'setAuditoriums'; auditoriums: Auditorium[] };

type SelectScreeningDispatch = Dispatch<SelectScreeningAction>;

const initialState: SelectScreeningState = {
  movie: undefined,
  screenings: undefined,
  pageStatus: PageStatus.Loading,
  auditoriums: [],
  seatsPerAuditorium: undefined,
  occupiedSeats: undefined
};

const selectScreeningReducer = (state: SelectScreeningState, action: SelectScreeningAction): SelectScreeningState => {
  switch (action.type) {
    case 'setMovie':
      return { ...state, movie: action.movie };
    case 'setScreenings':
      return { ...state, screenings: action.screenings };
    case 'setPageStatus':
      return { ...state, pageStatus: action.pageStatus };
    case 'setOccupiedSeats':
      return {
      ...state,
        occupiedSeats: action.occupiedSeats
      };
    case 'setSeatsPerAuditorium':
      return {
      ...state,
        seatsPerAuditorium: action.seatsPerAuditorium
      };
    case "setAuditoriums":
      return {
      ...state,
        auditoriums: action.auditoriums
      };
    default:
      return state;
  }
};

export const useSelectScreening = (id?: string): [SelectScreeningState, SelectScreeningDispatch] => {
  const [state, dispatch] = useReducer(selectScreeningReducer, initialState);

  useEffect(() => {
    if (id) {
      Promise.all([
        fetchScreeningsByMovieId(id),
        fetchSeatsPerAuditorium(),
        fetchAuditoriums(),
        fetchMovieById(id),
      ]).then(responses => {
        const screeningsByMovieId: Screening[] = responses[0];
        const seatsPerAuditorium: SeatsPerAuditorium[] = responses[1];
        const auditoriums: Auditorium[] = responses[2];
        const moviesMatching: Movie[] = responses[3];
        
        if (moviesMatching.length > 0) {
          fetchOccupiedSeatsByMovieName(moviesMatching[0].title)
          .then((occupiedSeats: OccupiedSeats[]) => {
            // Create map of screening ids to amount of occupied seats
            const screeningIdsToOccupiedSeatsMap: {[id: string] : number} = {};
            occupiedSeats.forEach((occupiedSeat) => {
              screeningIdsToOccupiedSeatsMap[occupiedSeat.screeningId] = occupiedSeat.occupied;
            });
            console.log(`Occupied seats: ${occupiedSeats}`)
            // Create map of auditorium ids to amount of seats per auditorium
            const auditoriumIdsToSeatsPerAuditorium: {[id: string] : SeatsPerAuditorium} = {};
            seatsPerAuditorium.forEach((seatsPerAuditorium) => {
              auditoriumIdsToSeatsPerAuditorium[seatsPerAuditorium.id] = seatsPerAuditorium;
            });
            console.log(auditoriumIdsToSeatsPerAuditorium);
            dispatch({ type: 'setAuditoriums', auditoriums });
            dispatch({ type: 'setScreenings', screenings: screeningsByMovieId });
            dispatch({ type: 'setSeatsPerAuditorium', seatsPerAuditorium: auditoriumIdsToSeatsPerAuditorium });
            dispatch({ type: 'setOccupiedSeats', occupiedSeats: screeningIdsToOccupiedSeatsMap });
            dispatch({ type: 'setMovie', movie: moviesMatching[0] });
            dispatch({ type: 'setPageStatus', pageStatus: PageStatus.Success });
          })
        } else {
          /// Movie does not exist
          dispatch({ type:'setPageStatus', pageStatus: PageStatus.Error });
        }
      })
    }

  }, [])
  
  return [state, dispatch];
};
