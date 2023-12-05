export const multiply = (array: number[]) => {
  return array.flat().reduce((a, b) => a * b, 1);
}
