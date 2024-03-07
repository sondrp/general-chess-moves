
// Good luck debugging this...

const white = /[RNBQKP]/;
const black = /[rnbqkpe]/;

const always = /../
const never = /gg/;

const empty = /. /;
const occupied = /.\w/

const enemies = /[RNBQKP][rnbqkpe]|[rnbqkpe][RNBQKP]/;
const friends = /[RNBQKP][RNBQKP]|[rnbqkpe][rnbqkpe]/;

const notEnemies = /[RNBQKP][rnbqkpe ]|[rnbqkpe][RNBQKP ]/;
const notFriends = /[RNBQKP][RNBQKP ]|[rnbqkpe][rnbqkpe ]/;


const secondRow = /^.{64,71}( ).{15}( ).{15}$/

type Condition = {
  stop: RegExp;
  addBreak: RegExp;
  boardState?: RegExp
};

export type Moveset = {
  directions: string[];
  condition: Condition;
}[];

export const rook: Moveset = [
  {
    directions: ['E', 'S', 'W', 'N'],
    condition: {
      stop: friends,
      addBreak: enemies,
    },
  },
];

export const king: Moveset = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    condition: {
      stop: friends,
      addBreak: always,
    },
  },
];
export const queen: Moveset = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    condition: {
      stop: friends,
      addBreak: enemies,
    },
  },
];
export const chancellor: Moveset = [
  {
    directions: ['E', 'S', 'W', 'N'],
    condition: {
      stop: friends,
      addBreak: enemies,
    },
  },
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    condition: {
      stop: friends,
      addBreak: always,
    },
  },
];

export const pawn: Moveset = [
    {
        directions: ['NE', 'NW'],
        condition: {
            stop: notEnemies,
            addBreak: always
        }
    },
    {
        directions: ['N'],
        condition: {
            stop: occupied,
            addBreak: always
        }
    },
    {
        directions: ['NN'],
        condition: {
            stop: occupied,
            addBreak: always,
            boardState: secondRow 
        }
    },

]
