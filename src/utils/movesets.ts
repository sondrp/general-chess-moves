// welcome to regex hell, good luck debugging this
const occupied = /.\w/;

const enemies = /[A-Z][a-z]|[a-z][A-Z]/;
const friends = /[A-Z][A-Z]|[a-z][a-z]/;

// Includes square occupied by enemy only
const notEnemies = /[A-Z][A-Z ]|[a-z][a-z ]/;

const beam = {
  stop: friends,
  addBreak: enemies,
};

export type MovesetHistory = 'K' | 'k' | 'Q' | 'q' | 'enPassant' | 'whitePawnDouble' | 'blackPawnDouble' 

export type Moveset = {
  directions: string[];
  stop?: RegExp;
  addBreak?: RegExp;
  boardCondition?: RegExp;
  replacement?: string;
  history?: MovesetHistory;
};

export const rookMoveset: Moveset[] = [
  {
    directions: ['E', 'S', 'W', 'N'],
    ...beam,
  },
];

export const knightMoveset: Moveset[] = [
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    stop: friends,
  },
];

export const bishopMoveset: Moveset[] = [
  {
    directions: ['NE', 'SE', 'SW', 'NW'],
    ...beam,
  },
];

export const queenMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    ...beam,
  },
];

export const whiteKingMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    stop: friends,
  },
  {
    directions: ['EE'],
    stop: friends,
    boardCondition: /I  R(.{8})$/,
    replacement: ' RK $1',
    history: 'K',
  },
  {
    directions: ['WW'],
    boardCondition: /R   I(.{11})$/,
    replacement: '  KR $1',
    history: 'Q',
  },
];

export const blackKingMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    stop: friends,
  },
  {
    directions: ['EE'],
    stop: friends,
    boardCondition: /^(.{4})I  r/,
    replacement: '$1 rk ',
    history: 'k',
  },
  {
    directions: ['WW'],
    stop: friends,
    boardCondition: /^r   I/,
    replacement: '  kr ',
    history: 'q',
  },
];

export const whitepawnMoveset: Moveset[] = [
  {
    directions: ['NE', 'NW'],
    stop: notEnemies,
  },
  {
    directions: ['N'],
    stop: occupied,
  },
  {
    directions: ['NN'],
    stop: occupied,
    boardCondition: / .{15}I.{24,31}$/,
    history: 'whitePawnDouble'
  },
  {
    directions: ['NE'],
    stop: occupied,
    boardCondition: / (.{14})Ip(.{72,78})$/,
    replacement: 'P$1  $2',
    history: 'enPassant',
  },
  {
    directions: ['NW'],
    stop: occupied,
    boardCondition: / (.{15})pI(.{72,78})$/,
    replacement: 'P$1  $2',
    history: 'enPassant',
  },
];

export const blackpawnMoveset: Moveset[] = [
  {
    directions: ['SE', 'SW'],
    stop: notEnemies,
  },
  {
    directions: ['S'],
    stop: occupied,
  },
  {
    directions: ['SS'],
    stop: occupied,
    boardCondition: /^.{16,23}I.{15} /,
    history: 'blackPawnDouble'
  },
  {
    directions: ['SW'],
    stop: occupied,
    boardCondition: /^(.{64,70})PI(.{14}) /,
    replacement: '$1  $2p',
    history: 'enPassant',
  },
  {
    directions: ['SE'],
    stop: occupied,
    boardCondition: /^(.{64,70})IP(.{15}) /,
    replacement: '$1  $2p',
    history: 'enPassant',
  },
];

export const archBishopMoveset: Moveset[] = [
  {
    directions: ['NE', 'SE', 'SW', 'NW'],
    ...beam,
  },
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    stop: friends,
  },
];

export const chancellorMoveset: Moveset[] = [
  {
    directions: ['E', 'S', 'W', 'N'],
    ...beam,
  },
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    stop: friends,
  },
];

export const amazonMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    ...beam,
  },
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    stop: friends,
  },
];
