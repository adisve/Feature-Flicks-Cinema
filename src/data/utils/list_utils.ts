export const shuffle = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5).slice(0, 4);
}