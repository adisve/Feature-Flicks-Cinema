import { Dispatch, useEffect, useReducer } from "react";
import { PageStatus } from "../../components/App";
import { Movie } from "../../domain/models/Movie";
import { fetchHeroMovies } from "../services/movie_service";
import { mapToMovies } from "../utils/mapping_utils";

interface HeroState {
  heroMovies: Movie[],
  pageStatus: PageStatus,
}

type HeroAction = 
  | { type: 'setHeroMovies', payload: Movie[] }
  | { type:'setPageStatus', payload: PageStatus }

type HeroDispatch = Dispatch<HeroAction>;

const initialState: HeroState = {
  heroMovies: [],
  pageStatus: PageStatus.Loading,
}

const heroReducer = (state: HeroState, action: HeroAction): HeroState => {
  switch (action.type) {
    case "setHeroMovies":
      return {...state, heroMovies: action.payload };
    case "setPageStatus":
      return {...state, pageStatus: action.payload };
    default:
      return state;
  }
}

export const useHero = (): [HeroState, HeroDispatch] => {
  const [state, dispatch] = useReducer(heroReducer, initialState);

  useEffect(() => {
    fetchHeroMovies()
      .then((moviesData) => {
        const movies: Movie[] = mapToMovies(moviesData);
        dispatch({ type: "setHeroMovies", payload: movies });
        dispatch({ type: "setPageStatus", payload: PageStatus.Success });
      })
      .catch((error) => {
        dispatch({ type: "setPageStatus", payload: PageStatus.Error });
      });
  }, []);
  return [state, dispatch];
}