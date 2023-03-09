import { Movie } from "../../domain/interfaces/Movie";

export const filterMoviesByCategories = (movies: Movie[], selectedCategories: string[]): Movie[] => {
  return selectedCategories.length > 0
    ? movies.filter((movie) => selectedCategories.every((category) => movie.description.categories.includes(category)))
    : movies;
}

export const getAvailableCategories = (movies: Movie[], filteredMovies: Movie[]): { [key: string]: number } => {
  const categories: { [key: string]: number } = {};

  movies.forEach((movie) => {
    movie.description.categories.forEach((category) => {
      if (!categories.hasOwnProperty(category)) {
        categories[category] = 0;
      }
    });
  });

  filteredMovies.forEach((movie) => {
    movie.description.categories.forEach((category) => {
      categories[category] = categories[category] ? categories[category] + 1 : 1;
    });
  });

  return categories;
};



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