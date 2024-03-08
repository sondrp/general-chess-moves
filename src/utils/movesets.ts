// Good luck debugging this...
const never = /g/;
const always = /./;
const occupied = /.\w/;

const enemies = /[A-Z][a-z]|[a-z][A-Z]/;
const friends = /[A-Z][A-Z]|[a-z][a-z]/;

// Includes square occupied by enemy only
const notEnemies = /[A-Z][A-Z ]|[a-z][a-z ]/;

// For white pawn
const clearNorth = / .{15}$/;
const secondRow = /^.{24,31}$/; // end of the string
const fourthRow = /^.{49,56}$/; // start of the string
const fourthRowBlackPawn = /^.{48,55}p$/; // start of the string
const blackPawnRight = /^p/;

// For black pawn
const seventhRow = /^.{16,23}$/;
const clearSouth = /^.{15} /;
const fourthRowPawnRight = /^P.{56,62}$/; // en passant to the right
const fourthRowPawnLeft = /^.{64,70}P$/; // en passant to the left


export type Condition = {
  stop: RegExp;
  addBreak: RegExp;
  boardBefore?: RegExp;
  boardAfter?: RegExp;
};

const beam: Condition = {
  stop: friends,
  addBreak: enemies,
};

const hop: Condition = {
  stop: friends,
  addBreak: always,
};

export type Moveset = {
  directions: string[];
  condition: Condition;
};

export const rookMoveset: Moveset[] = [
  {
    directions: ['E', 'S', 'W', 'N'],
    condition: beam,
  },
];

export const knightMoveset: Moveset[] = [
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    condition: hop,
  },
];

export const bishopMoveset: Moveset[] = [
  {
    directions: ['NE', 'SE', 'SW', 'NW'],
    condition: beam,
  },
];

export const queenMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    condition: beam,
  },
];

export const kingMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    condition: hop,
  },
];

export const whitepawnMoveset: Moveset[] = [
  {
    directions: ['NE', 'NW'],
    condition: {
      stop: notEnemies,
      addBreak: always,
    },
  },
  {
    directions: ['N'],
    condition: {
      stop: occupied,
      addBreak: always,
    },
  },
  {
    directions: ['NN'],
    condition: {
      stop: occupied,
      addBreak: always,
      boardBefore: clearNorth,
      boardAfter: secondRow,
    },
  },
];

export const blackpawnMoveset: Moveset[] = [
  {
    directions: ['SE', 'SW'],
    condition: {
      stop: notEnemies,
      addBreak: always,
    },
  },
  {
    directions: ['S'],
    condition: {
      stop: occupied,
      addBreak: always,
    },
  },
  {
    directions: ['SS'],
    condition: {
      stop: occupied,
      addBreak: always,
      boardBefore: seventhRow,
      boardAfter: clearSouth,
    },
  },
];

export const archBishopMoveset: Moveset[] = [
  {
    directions: ['NE', 'SE', 'SW', 'NW'],
    condition: beam,
  },
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    condition: hop,
  },
];

export const chancellorMoveset: Moveset[] = [
  {
    directions: ['E', 'S', 'W', 'N'],
    condition: beam,
  },
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    condition: hop,
  },
]

export const amazonMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    condition: beam,
  },
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    condition: hop,
  },
]