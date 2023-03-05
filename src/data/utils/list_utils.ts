
/**
 * Shuffles a given array of items in place.
 * @param arr 
 * @returns 
 */
export const shuffle = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5).slice(0, 4);
}