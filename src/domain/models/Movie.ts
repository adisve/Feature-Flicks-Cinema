export class Movie {
  id: number;
  title: string;
  length: number;
  categories: string[];
  posterImage: string;
  screenings: Date[];

  constructor(id: number, title: string, length: number, categories: string[], posterImage: string, screenings: Date[]) {
    this.id = id;
    this.title = title;
    this.length = length;
    this.categories = categories;
    this.posterImage = posterImage;
    this.screenings = screenings;
  }
}
