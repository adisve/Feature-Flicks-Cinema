/**
 * Formats a string for display in the UI, specifically for use
 * in components that require the running time of the movie.
 * @param minutes 
 * @returns 
 */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString()} h ${remainingMinutes.toString()} min`;
}

export const dateHasPassed = (date: Date): boolean => {
  const currentDate = new Date();
  return date < currentDate;
}

export const generateUniqueString = (): string => {
  const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomThreeLetters = () => {
    let result = '';
    for (let i = 0; i < 3; i++) {
      result += randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
    }
    return result;
  };
  return `${randomThreeLetters()}${randomThreeLetters()}`;
}
