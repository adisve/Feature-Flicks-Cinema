export class Movie {
  id: number;
  title: string;
  length: number;
  categories: string[];
  posterImage: string;

  constructor(id: number, title: string, length: number, categories: string[], posterImage: string) {
    this.id = id;
    this.title = title;
    this.length = length;
    this.categories = categories;
    this.posterImage = posterImage;
  }
}
