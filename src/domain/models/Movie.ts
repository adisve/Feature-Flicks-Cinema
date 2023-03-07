import { Screening } from "./Screening";

/**
 * Movie class, used as DTO
 */
export class Movie {
  id: number;
  title: string;
  length: number;
  categories: string[];
  posterImage: string;
  screenings?: Screening[];

  constructor(id: number, title: string, length: number, categories: string[], posterImage: string, screenings?: Screening[]) {
    this.id = id;
    this.title = title;
    this.length = length;
    this.categories = categories;
    this.posterImage = posterImage;
    this.screenings = screenings;
  }
}
