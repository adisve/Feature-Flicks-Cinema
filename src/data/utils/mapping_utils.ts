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