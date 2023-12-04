import { readInstructions } from "../utils/readFile";
import { sum } from "../utils/sum";

const inputArray = readInstructions('day3/input.txt').map(line => {
  return line.split('');
});

const matrixValidPosition = (row: number, col: number): boolean => {
  return row >= 0 && row < inputArray[0].length && col >= 0 && col < inputArray.length;
};

type Cordinate = { x: number; y: number; }

class EngineNumber {
  cordinates: Cordinate[];
  value: number;
  isValid: boolean;
  symbol: string[];

  constructor(coordinates: Cordinate[], value: string) {
    this.cordinates = coordinates;
    this.value = Number(value);
    this.isValid = false
    this.symbol = []
  }

  setValidity() {
    this.isValid = true;
  }
  addSymbol(symbol: string) {
    this.symbol.push(symbol);
  }
}

const prepareNumbers: EngineNumber[] = [];

for (let l = 0; l < inputArray.length; l++) {
  let coordinates: Cordinate[] = [];
  let value: string = '';

  for (let e = 0; e <= inputArray[l].length; e++) {
    const isDigit = e < inputArray[l].length && inputArray[l][e].match(/\d/g);

    if (isDigit) {
      coordinates.push({ x: l, y: e });
      value += inputArray[l][e];
    }

    if (!isDigit || e === inputArray[l].length - 1) {
      prepareNumbers.push(new EngineNumber(coordinates, value));
      coordinates = [];
      value = '';
    }
  }
}

const numbers = prepareNumbers.filter(number => number.value != 0);

//PART1-----------------------------------------------------------------------------
numbers.forEach(number => {
  const nbs = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
  for (const coordinate of number.cordinates) {
    const { x, y } = coordinate
    nbs.forEach(c => {
      if (
        matrixValidPosition(x + c[0], y + c[1]) &&
        inputArray[x + c[0]][y + c[1]].match(/[^0-9.]/g)
      ) {
        if (number.isValid !== true) {
          return number.setValidity();
        }
      }
    })
  }
});

const validValues = [];

numbers.forEach(n => {
  if (n.isValid === true) {
    validValues.push(n.value);
  }
});

console.log('The Part1 answer is:', sum(validValues));
