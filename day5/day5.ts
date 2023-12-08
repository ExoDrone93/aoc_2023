import { readInstructions } from "../utils/readFile";

class Seed {
  id: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;

  constructor(seed: string) {
    this.id = Number(seed);
  }

  setValue(property: any, value: number) {
    this[property] = value;
  }

}

const seeds = readInstructions('day5/seeds.txt').map(line => line.split(' ')).reduce((acc, curr) => acc.concat(curr), []).map(s => {
  return new Seed(s);
});

const prepareMaps = (line: string) => {
  return line.split(' ').map(Number);
};

const stsMap = readInstructions('day5/stsMap.txt').map(prepareMaps);
const stfMap = readInstructions('day5/stfMap.txt').map(prepareMaps);
const ftwMap = readInstructions('day5/ftwMap.txt').map(prepareMaps);
const wtlMap = readInstructions('day5/wtlMap.txt').map(prepareMaps);
const lttMap = readInstructions('day5/lttMap.txt').map(prepareMaps);
const tthMap = readInstructions('day5/tthMap.txt').map(prepareMaps);
const htlMap = readInstructions('day5/htlMap.txt').map(prepareMaps);

const mapping = (reference: string, target: string, maps: any[]) => {
  for (const seed of seeds) {
    const referenceValue = seed[reference];
    let isMatch = false;

    for (const map of maps) {
      const interval = [map[1], (map[1] + map[2]) - 1];
      if (referenceValue >= interval[0] && referenceValue <= interval[1]) {
        const difference = referenceValue - map[1];
        const mappedValue = map[0] + difference;
        seed.setValue(target, mappedValue);
        isMatch = true;
      };
    };
    
    if (isMatch === false) {
      seed.setValue(target, referenceValue);
    };

  };
};

seeds.map(s => {
  mapping('id', 'soil', stsMap);
  mapping('soil', 'fertilizer', stfMap);
  mapping('fertilizer', 'water', ftwMap);
  mapping('water', 'light', wtlMap);
  mapping('light', 'temperature', lttMap);
  mapping('temperature', 'humidity', tthMap);
  mapping('humidity', 'location', htlMap)
});

//PART1------------------------------------------------------------
const locations = seeds.map(s => s.location);

console.log('The part1 answer is:', Math.min(...locations));
