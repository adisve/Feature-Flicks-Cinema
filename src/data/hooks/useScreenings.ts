import { Dispatch, useEffect, useReducer } from "react";
import { PageStatus } from "../../components/App";
import { Movie } from "../../domain/models/Movie";
import { fetchMovies, fetchScreenings, sortMoviesByScreeningDate } from "../services/movie_service";
import { mapToScreenings, mapToMovies } from "../utils/mapping_utils";

interface ScreeningsState {
  pageStatus: PageStatus;
  viewType: string;
  movies: Movie[];
  showOffcanvas: boolean;
  selectedCategories: string[];
}

type ScreeningsAction =
  | { type: "setPageStatus", pageStatus: PageStatus }
  | { type: "setViewType", viewType: string }
  | { type: "setMovies", movies: Movie[] }
  | { type: "setShowOffcanvas", showOffcanvas: boolean }
  | { type: "setSelectedCategories", selectedCategories: string[] };

type ScreeningsDispatch = Dispatch<ScreeningsAction>;

const initialState: ScreeningsState = {
  pageStatus: PageStatus.LOADING,
  viewType: 'list',
  movies: [],
  showOffcanvas: false,
  selectedCategories: [],
}

const screeningsReducer = (state: ScreeningsState, action: ScreeningsAction): ScreeningsState => {
  switch (action.type) {
    case "setPageStatus":
      return {...state, pageStatus: action.pageStatus };
    case "setViewType":
      return {...state, viewType: action.viewType };
    case "setMovies":
      return {...state, movies: action.movies };
    case "setShowOffcanvas":
      return {...state, showOffcanvas: action.showOffcanvas };
    case "setSelectedCategories":
      return {...state, selectedCategories: action.selectedCategories };
    default:
      return state;
  }
}

export const useScreenings = (): [ScreeningsState, ScreeningsDispatch] => {

  const [state, dispatch] = useReducer(screeningsReducer, initialState);

  useEffect(() => {
    Promise.all([
      fetchMovies(),
      fetchScreenings(),
    ])
      .then((responses) => {
        const movieDataArray = responses[0];
        const screeningsData = responses[1];
        const screenings = mapToScreenings(screeningsData);
        var movies: Movie[] = mapToMovies(movieDataArray, screenings);
        movies = sortMoviesByScreeningDate(movies);
        dispatch({ type: "setMovies", movies });
        dispatch({ type: "setPageStatus", pageStatus: PageStatus.SUCCESS });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: "setPageStatus", pageStatus: PageStatus.ERROR });
      });
  }, []);

  return [state, dispatch];
}