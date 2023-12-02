export const sum = (array: number[]) => {
    return array.flat().reduce((a, c) => a + c, 0);
}
