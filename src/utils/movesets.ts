// welcome to regex hell, good luck debugging this
const always = /./;
const occupied = /.\w/;

const enemies = /[A-Z][a-z]|[a-z][A-Z]/;
const friends = /[A-Z][A-Z]|[a-z][a-z]/;

// Includes square occupied by enemy only
const notEnemies = /[A-Z][A-Z ]|[a-z][a-z ]/;


export type Condition = {
  stop: RegExp;
  addBreak: RegExp;
  boardCondition?: RegExp
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
      boardCondition: / .{15}I.{24,31}$/
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
      boardCondition: /^.{16,23}I.{15} /
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