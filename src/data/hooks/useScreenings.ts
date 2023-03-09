import { Dispatch, useEffect, useReducer } from "react";
import { PageStatus } from "../../domain/enums/PageStatus";
import { fetchCategories, fetchMovies, fetchScreenings } from "../services/movie_service";
import { Movie } from "../../domain/interfaces/Movie";
import { Screening } from "../../domain/interfaces/Screening";
import { Category } from "../../domain/interfaces/Category";
import { sortScreeningsByDate } from "../utils/list_utils";

interface ScreeningsState {
  pageStatus: PageStatus;
  viewType: string;
  movies: Movie[];
  showOffcanvas: boolean;
  selectedCategories: string[];
  screenings: Screening[];
  categories: Category[];
  visibleCategoryCounts: { [key: string]: number };
}

type ScreeningsAction =
  | { type: "setPageStatus", pageStatus: PageStatus }
  | { type: "setViewType", viewType: string }
  | { type: "setMovies", movies: Movie[] }
  | { type: "setShowOffcanvas", showOffcanvas: boolean }
  | { type: "setSelectedCategories", selectedCategories: string[] }
  | { type: "setCategories", categories: Category[] }
  | { type: "setVisiblecategoryCounts", visibleCategoryCounts: { [key: string]: number } }
  | { type: "setScreenings", screenings: Screening[] };

type ScreeningsDispatch = Dispatch<ScreeningsAction>;

const initialState: ScreeningsState = {
  pageStatus: PageStatus.Loading,
  viewType: 'list',
  movies: [],
  showOffcanvas: false,
  selectedCategories: [],
  screenings: [],
  categories: [],
  visibleCategoryCounts: {}
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
    case "setCategories":
      return {...state, categories: action.categories };
    case "setVisiblecategoryCounts":
      return {...state, visibleCategoryCounts: action.visibleCategoryCounts };
    case "setScreenings":
      return {...state, screenings: action.screenings };
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
      fetchCategories()
    ])
      .then((responses) => {
        const movies: Movie[] = responses[0];
        const screenings: Screening[] = responses[1];
        const categories: Category[] = responses[2].sort((a, b) => a.title.localeCompare(b.title));
        const initialCounts: {[key: string]: number} = {};
        categories.forEach((category) => {
          initialCounts[category.title] = 0;
        });
        movies.forEach((movie) => {
          movie.description.categories.forEach((category) => {
            initialCounts[category] += 1;
          });
        });
        dispatch({ type: "setScreenings", screenings: screenings });
        dispatch({ type: "setVisiblecategoryCounts", visibleCategoryCounts: initialCounts });
        dispatch({ type: "setMovies", movies: movies });
        dispatch({ type: "setPageStatus", pageStatus: PageStatus.Success });
        dispatch({ type: "setCategories", categories: categories });
        dispatch({ type: "setVisiblecategoryCounts", visibleCategoryCounts: initialCounts });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: "setPageStatus", pageStatus: PageStatus.Error });
      });
  }, []);
  
  

  return [state, dispatch];
}
