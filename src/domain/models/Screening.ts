export class Screening {
  id: number;
  time: Date;
  movieId: number;
  auditoriumId: number;

  constructor(id: number, time: Date, movieId: number, auditoriumId: number) {
    this.id = id;
    this.time = time;
    this.movieId = movieId;
    this.auditoriumId = auditoriumId;
  }
}
