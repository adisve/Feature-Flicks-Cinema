import { Movie } from "../../domain/models/Movie";
import { Screening } from "../../domain/models/Screening";
import { TicketType } from "../../domain/models/TicketType";

/**
 * Converts a raw movie object into its corresponding DTO
 * @param movies
 * @param screenings
 * @returns 
 */
export const mapToMovies = (movies: any[], allMovieScreenings?: Screening[]): Movie[] => {
  return movies.map((movieData: any) => {
    const movieScreenings = allMovieScreenings?.filter((screening: Screening) => screening.movieId === movieData.id);
    return new Movie(
      movieData.id,
      movieData.title,
      movieData.description.length,
      movieData.description.categories,
      movieData.description.posterImage,
      movieScreenings
    );
  });
};


export const mapToMovie = (movieData: any, movieScreenings?: Screening[]): Movie => {
  return new Movie(
    movieData.id,
    movieData.title,
    movieData.description.length,
    movieData.description.categories,
    movieData.description.posterImage,
    movieScreenings
  )
}

export const mapToScreenings = (screeningsData: any[]): Screening[] => {
  return screeningsData.map((item: any) => {
    const { id, time, movieId, auditoriumId } = item;
    const screeningTime = new Date(time);
    return new Screening(id, screeningTime, movieId, auditoriumId);
  });
}

export const mapToScreening = (screeningData: any): Screening => {
  return new Screening(
    screeningData.id,
    new Date(screeningData.time),
    screeningData.movieId,
    screeningData.auditoriumId  
  )
}

export const mapToTicketTypes = (ticketTypeData: any): TicketType[] => {
  return ticketTypeData.map((ticketType: any) => {
    return new TicketType(
      ticketType.id,
      ticketType.name,
      ticketType.price
    );
  });
}

export const getAvailableCategories = (movies: Movie[], filteredMovies: Movie[]): {
  category: string;
  count: number;
}[] => {
  return Array.from(new Set(movies.flatMap((movie) => movie.categories)))
  .sort()
  .map((category) => {
    const count = filteredMovies.filter((movie) => movie.categories.includes(category)).length;
    return { category, count };
  });
}

export const filterMoviesByCategories = (movies: Movie[], selectedCategories: string[]): Movie[] => {
  return selectedCategories.length > 0
    ? movies.filter((movie) => selectedCategories.every((category) => movie.categories.includes(category)))
    : movies;
}

export const screeningTimeToString = (screeningTime: Date): string => {
  return screeningTime.toLocaleString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
}