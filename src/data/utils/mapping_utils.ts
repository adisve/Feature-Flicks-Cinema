import { Movie } from "../../domain/models/Movie";

export const mapToMovies = (movies: any[]): Movie[] => {
  console.log(movies);
  return movies.map((movieData: any) => {
    return new Movie(
      movieData.id,
      movieData.title,
      movieData.description.length,
      movieData.description.categories,
      movieData.description.posterImage
    );
  });
};