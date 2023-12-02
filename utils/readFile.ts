import { readFileSync } from 'fs';

export const readInstructions = (filePath: string) => {
  const contents = readFileSync(filePath, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
};
