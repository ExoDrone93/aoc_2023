export const matrixValidPosition = (array: any[], row: number, col: number): boolean => {
  return row >= 0 && row < array[0].length && col >= 0 && col < array.length;
};