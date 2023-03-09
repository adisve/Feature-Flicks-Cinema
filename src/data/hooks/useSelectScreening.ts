import { useReducer, useEffect, Dispatch } from 'react';
import { Movie } from '../../domain/models/Movie';
import { Screening } from '../../domain/models/Screening';
import { PageStatus } from '../../components/App';
import { fetchMovieById, fetchScreeningsByMovieId } from '../services/movie_service';
import { mapToMovie, mapToScreenings } from '../utils/mapping_utils';

interface SelectScreeningState {
  movie?: Movie;
  screenings?: Screening[];
  pageStatus: PageStatus;
}

type SelectScreeningAction =
  | { type: 'setMovie'; movie: Movie }
  | { type: 'setScreenings'; screenings: Screening[] }
  | { type: 'setPageStatus'; pageStatus: PageStatus };

type SelectScreeningDispatch = Dispatch<SelectScreeningAction>;

const initialState: SelectScreeningState = {
  movie: undefined,
  screenings: undefined,
  pageStatus: PageStatus.Loading,
};

const selectScreeningReducer = (state: SelectScreeningState, action: SelectScreeningAction): SelectScreeningState => {
  switch (action.type) {
    case 'setMovie':
      return { ...state, movie: action.movie };
    case 'setScreenings':
      return { ...state, screenings: action.screenings };
    case 'setPageStatus':
      return { ...state, pageStatus: action.pageStatus };
    default:
      return state;
  }
};

export const useSelectScreening = (id?: string): [SelectScreeningState, SelectScreeningDispatch] => {
  const [state, dispatch] = useReducer(selectScreeningReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'setPageStatus', pageStatus: PageStatus.Loading });

    if (id) {
      Promise.all([fetchMovieById(id), fetchScreeningsByMovieId(id)])
        .then((responses) => {
          const movieDataArray: any = responses[0];
          const screeningsData = responses[1];
          const screenings = mapToScreenings(screeningsData);
          const mappedMovie = mapToMovie(movieDataArray[0], screenings);

          dispatch({ type: 'setMovie', movie: mappedMovie });
          dispatch({ type: 'setScreenings', screenings });
          dispatch({ type: 'setPageStatus', pageStatus: PageStatus.Success });
        })
        .catch((error) => {
          console.error('Error fetching movie and screenings', error);
          dispatch({ type: 'setPageStatus', pageStatus: PageStatus.Error });
        });
    }
  }, [id]);

  return [state, dispatch];
};
