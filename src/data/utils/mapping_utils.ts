import { Movie } from "../../domain/models/Movie";

/**
 * Converts a raw movie object into its corresponding DTO
 * @param movies 
 * @returns 
 */
export const mapToMovies = (movies: any[]): Movie[] => {
  return movies.map((movieData: any) => {
    return new Movie(
      movieData.id,
      movieData.title,
      movieData.description.length,
      movieData.description.categories,
      movieData.description.posterImage,
      movieData.screenings
    );
  });
};
