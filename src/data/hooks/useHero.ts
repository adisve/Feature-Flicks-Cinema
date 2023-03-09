import { Dispatch, useEffect, useReducer } from "react";
import { PageStatus } from "../../components/App";
import { fetchHeroMovies } from "../services/movie_service";
import { Movie } from "../../domain/interfaces/Movie";

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
      .then((movies: Movie[]) => {
        dispatch({ type: "setHeroMovies", payload: movies });
        dispatch({ type: "setPageStatus", payload: PageStatus.Success });
      })
      .catch((error) => {
        dispatch({ type: "setPageStatus", payload: PageStatus.Error });
      });
  }, []);
  return [state, dispatch];
}