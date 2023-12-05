import { matrixValidPosition } from "../utils/matrixValidPosition";
import { multiply } from "../utils/multiply";
import { readInstructions } from "../utils/readFile";
import { sum } from "../utils/sum";

const inputArray = readInstructions('day3/input.txt').map(line => {
  return line.split('');
});

type Cordinate = { x: number; y: number; }

class EngineNumber {
  cordinates: Cordinate[];
  value: number;
  isValid: boolean;
  hasGear: boolean;

  constructor(coordinates: Cordinate[], value: string) {
    this.cordinates = coordinates;
    this.value = Number(value);
    this.isValid = false;
    this.hasGear = false;
  };

  setValidity() {
    this.isValid = true;
  };

};

class Gear {
  cordinate: Cordinate;
  adjecentDigitValues: number[];
  gearRatio: number;

  constructor(coordinate: Cordinate) {
    this.cordinate = coordinate;
    this.adjecentDigitValues = [];
  };

  addAdjecentDigitValue(digitValue: number) {
    this.adjecentDigitValues.push(digitValue);
  };

  setGearRatio() {
    this.gearRatio = multiply(this.adjecentDigitValues);
  };

};

const prepareNumbers: EngineNumber[] = [];
const gears: Gear[] = [];

for (let l = 0; l < inputArray.length; l++) {
  let coordinates: Cordinate[] = [];
  let value: string = '';

  for (let e = 0; e <= inputArray[l].length; e++) {
    const isDigit = e < inputArray[l].length && inputArray[l][e].match(/\d/g);

    if (isDigit) {
      coordinates.push({ x: l, y: e });
      value += inputArray[l][e];
    };

    if (!isDigit || e === inputArray[l].length - 1) {
      const engineNumber = new EngineNumber(coordinates, value);
      prepareNumbers.push(engineNumber);
      if (inputArray[l][e] === '*') {
        gears.push(new Gear({ x: l, y: e }));
      }
      coordinates = [];
      value = '';
    };
  };
};

const numbers = prepareNumbers.filter(number => number.value != 0);
const neighbours = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

//PART1-----------------------------------------------------------------------------
numbers.forEach(number => {
  for (const coordinate of number.cordinates) {
    const { x, y } = coordinate
    neighbours.forEach(c => {
      if (matrixValidPosition(inputArray, x + c[0], y + c[1]) && inputArray[x + c[0]][y + c[1]].match(/[^0-9.]/g)) {
        if (number.isValid !== true) {
          if (inputArray[x + c[0]][y + c[1]] === '*') {
            gears.find(g => (g.cordinate.x === x + c[0] && g.cordinate.y === y + c[1])).addAdjecentDigitValue(number.value);
          }
          return number.setValidity();
        };
      };
    });
  };
});

const validValues = numbers.filter(number => number.isValid === true).map(number => number.value);

console.log('The Part1 answer is:', sum(validValues));

//PART2-----------------------------------------------------------------------------
const validGearRatios = gears.filter(gear => gear.adjecentDigitValues.length === 2).map(gear => {
  gear.setGearRatio();
  return gear.gearRatio;
});

console.log('The Part2 answer is:', sum(validGearRatios));
