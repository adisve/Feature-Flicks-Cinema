export interface Movie {
  id: number;
  title: string;
  description: {
    length: number;
    categories: string[];
    posterImage: string;
  }
}