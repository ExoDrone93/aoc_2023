import { readInstructions } from "../utils/readFile";
import { sum } from "../utils/sum";

const inputArray = readInstructions('day2/input.txt').map((game) => {
    const turn = game.replaceAll(' ', '').split(':');
    const gameId = turn[0].replace('Game', '');
    const games = turn[1].split(';');
    const gameTurn = games.map(gturn => {
        return gturn.split(',')
    })
    return [gameId, gameTurn]
});

class Turn {
    red?: number;
    blue?: number;
    green?: number;

    constructor(turn: any) {
        this.red = Number(this.getNumber(turn, 'red')) | 0;
        this.blue = Number(this.getNumber(turn, 'blue')) | 0;
        this.green = Number(this.getNumber(turn, 'green')) | 0;
    }

    private getNumber(turn: any, color: string) {
        const index = turn.findIndex((element) => element.match(color));
        if (index !== -1) {
            const cubeNumber = turn[index].match(/\d+/g);
            return cubeNumber;
        }
    }
}

class Game {
    id: number;
    turns: Turn[];

    constructor(gameTurn: (string | string[][])[]) {
        this.id = Number(gameTurn.at(0));
        this.turns = this.setTurn(gameTurn.at(1) as string[][]);
    }

    private setTurn(turns: string[][]) {
        return turns.map((turn: string[]) => {
            const gameTurn = new Turn(turn);
            return gameTurn;
        })
    }
}

const gameByturns = inputArray.map(input => { return new Game(input) });

//PART 1----------------------------------------------------------------
const validGames = [];

gameByturns.forEach(game => {
    const validity = [];
    for (const turn of game.turns) {
        if (turn.red > 12 || turn.blue > 14 || turn.green > 13) {
            validity.push(1);
        } else {
            validity.push(0)
        };
    };
    if (sum(validity) === 0) {
        validGames.push(game.id);
    };
});

console.log('The part 1 answer is:',sum(validGames));

//PART 2----------------------------------------------------------------
const gamePowers = []

gameByturns.map(game => {
    const colors = [[], [], []]
    for (const turn of game.turns) {
        const red = turn.red ? turn.red : 0;
        const blue = turn.blue ? turn.blue : 0;
        const green = turn.green ? turn.green : 0;
        colors[0].push(red);
        colors[1].push(blue);
        colors[2].push(green);
    }
    const gamePower = [Math.max(...colors[0]) * Math.max(...colors[1]) * Math.max(...colors[2])];
    gamePowers.push(gamePower);
});

console.log('The part 2 answer is:',sum(gamePowers));

