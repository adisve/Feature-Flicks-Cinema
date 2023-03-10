import { Movie } from "../../domain/interfaces/Movie";
import { Screening } from "../../domain/interfaces/Screening";
import { TicketType } from "../../domain/interfaces/TicketType";
import { TicketSelection } from "../../domain/models/TicketSelection";

/**
 * Shuffles a given array of items in place.
 * @param arr 
 * @returns 
 */
export const shuffle = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5).slice(0, 4);
}

export const groupScreeningsByAuditorium = (screenings: Screening[]): { [auditoriumId: number]: Screening[] } => {
  const screeningsByAuditorium: { [auditoriumId: number]: Screening[] } = {};

  screenings.forEach(screening => {
    if (!screeningsByAuditorium[screening.auditoriumId]) {
      screeningsByAuditorium[screening.auditoriumId] = [];
    }
    screeningsByAuditorium[screening.auditoriumId].push(screening);
  });
  return screeningsByAuditorium;
}

/**
 * Sorts movies by their most recent screening date
 * @param movies 
 * @returns List of movies
 */
export const sortScreeningsByDate = (screenings: Screening[]): Screening[] => {
  return screenings.sort((a, b) => new Date(screenings[0].time).getTime() - new Date(screenings[0].time).getTime());
};

export const getAllTicketTypes = (ticketSelectionDict: {[id: string]: TicketSelection}): TicketType[] => {
  const ticketTypes: TicketType[] = [];
  for (const id in ticketSelectionDict) {
    const ticketSelection = ticketSelectionDict[id];
    ticketTypes.push(ticketSelection.ticketType);
  }
  return ticketTypes;
}

// Function to get the first screening date for a movie
const getFirstScreeningDate = (movie: Movie, screenings: Screening[]): Date | null => {
  const movieScreenings = screenings.filter((screening) => screening.movieId === movie.id);
  if (movieScreenings.length > 0) {
    return new Date(movieScreenings[0].time);
  }
  return null;
}

// Sort the movies by the first screening date
export const sortedMovies = (movies: Movie[], screenings: Screening[]): Movie[] => {
  return movies.sort((leftMovie, rightMovie) => {
    const leftMovieScreening = getFirstScreeningDate(leftMovie, screenings);
    const rightMovieScreening = getFirstScreeningDate(rightMovie, screenings);
    if (leftMovieScreening && rightMovieScreening) {
      return leftMovieScreening.getTime() - rightMovieScreening.getTime();
    } else if (leftMovieScreening) {
      return -1;
    } else {
      return 1;
    }
  });
}