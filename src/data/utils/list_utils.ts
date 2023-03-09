import { Screening } from "../../domain/interfaces/Screening";

/**
 * Shuffles a given array of items in place.
 * @param arr 
 * @returns 
 */
export const shuffle = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5).slice(0, 4);
}

export const groupScreeningsByAuditorium = (screenings: Screening[]): { [auditoriumId: number]: Screening[] } => {
  const screeningsByAuditorium: { [auditoriumId: number]: Screening[] } = {};

  screenings.forEach(screening => {
    if (!screeningsByAuditorium[screening.auditoriumId]) {
      screeningsByAuditorium[screening.auditoriumId] = [];
    }
    screeningsByAuditorium[screening.auditoriumId].push(screening);
  });
  return screeningsByAuditorium;
}