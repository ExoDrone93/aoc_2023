import { readInstructions } from "../utils/readFile";
import { sum } from "../utils/sum";

class Card {
  id: number;
  winningNumbers: number[];
  myNumbers: number[];
  matches: number[];
  point: number;

  constructor(id: string, winningNumbers: number[], myNumbers: number[]) {
    this.id = Number(id);
    this.winningNumbers = winningNumbers;
    this.myNumbers = myNumbers;
  }

  setMatches() {
    this.matches = this.myNumbers.filter(m => this.winningNumbers.includes(m));
  }

  setPoint() {
    this.point = this.matches.length ? 2 ** (this.matches.length - 1) : 0;
  }
}

const parseLine = (line: string): Card => {
  const [rawId, rawNumbers] = line.split(':');
  const id = rawId.replace(/(?:Card|\ )/g, '');
  const [winningNumbers, myNumbers] = rawNumbers.split('|').map(numbers =>
    numbers.split(' ').filter(w => w !== '').map(Number)
  );

  return new Card(id, winningNumbers, myNumbers);
}

const cards: Card[] = readInstructions('day4/input.txt').map(parseLine);

//PART1--------------------------------------------------------------------------------
const cardPoints = cards.map(c => {
  c.setMatches();
  c.setPoint();
  return c.point
});

console.log('The part1 answer is:', sum(cardPoints));

//PART2--------------------------------------------------------------------------------
for (const card of cards) {
  const index = cards.indexOf(card);
  if (index !== -1) {
    const endIndex = index + card.matches.length + 1;
    const filteredElements = cards.slice(index + 1, endIndex);
    cards.push(...filteredElements);
  };
};

console.log('The part2 answer is:', cards.length);

