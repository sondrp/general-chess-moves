import { Moveset } from "../../types/types";

// welcome to regex hell, good luck debugging this
const occupied = /.\w/;

const enemies = /[A-Z][a-z]|[a-z][A-Z]/;
const friends = /[A-Z][A-Z]|[a-z][a-z]/;

const notEnemies = /[A-Z][A-Z ]|[a-z][a-z ]/;

const beam = {
  stop: friends,
  addBreak: enemies,
};



const rookMoveset: Moveset[] = [
  {
    directions: ['E', 'S', 'W', 'N'],
    ...beam,
  },
];

const knightMoveset: Moveset[] = [
  {
    directions: ['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'],
    stop: friends,
  },
];

const bishopMoveset: Moveset[] = [
  {
    directions: ['NE', 'SE', 'SW', 'NW'],
    ...beam,
  },
];

const queenMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    ...beam,
  },
];

const whiteKingMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    stop: friends,
  },
  {
    directions: ['EE'],
    stop: friends,
    boardCondition: /I  R$/,
    replacement: ' RK ',
    tag: 'K',
  },
  {
    directions: ['WW'],
    boardCondition: /R   I(...)$/,
    replacement: '  KR $1',
    tag: 'Q',
  },
];

const blackKingMoveset: Moveset[] = [
  {
    directions: ['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'],
    stop: friends,
  },
  {
    directions: ['EE'],
    stop: friends,
    boardCondition: /^(....)I  r/,
    replacement: '$1 rk ',
    tag: 'k',
  },
  {
    directions: ['WW'],
    stop: friends,
    boardCondition: /^r   I/,
    replacement: '  kr ',
    tag: 'q',
  },
];

const whitepawnMoveset: Moveset[] = [
  {
    directions: ['NE', 'NW'],
    stop: notEnemies,
    tag: 'P'
  },
  {
    directions: ['N'],
    stop: occupied,
    tag: 'P'
  },
  {
    directions: ['NN'],
    stop: occupied,
    boardCondition: / .{7}I.{8,15}$/,
    tag: 'whitePawnDoubleForward'
  },
  {
    directions: ['NE'],
    stop: occupied,
    boardCondition: / (.{6})Ip(.{32,38})$/,
    replacement: 'P$1  $2',
    tag: 'enPassant',
  },
  {
    directions: ['NW'],
    stop: occupied,
    boardCondition: / (.{7})pI(.{32,38})$/,
    replacement: 'P$1  $2',
    tag: 'enPassant',
  },
];

const blackpawnMoveset: Moveset[] = [
  {
    directions: ['SE', 'SW'],
    stop: notEnemies,
    tag: 'p',
  },
  {
    directions: ['S'],
    stop: occupied,
    tag: 'p',
  },
  {
    directions: ['SS'],
    stop: occupied,
    boardCondition: /^.{8,15}I.{7} /,
    tag: 'blackPawnDoubleForward'
  },
  {
    directions: ['SW'],
    stop: occupied,
    boardCondition: /^(.{32,38})PI(.{6}) /,
    replacement: '$1  $2p',
    tag: 'enPassant',
  },
  {
    directions: ['SE'],
    stop: occupied,
    boardCondition: /^(.{32,38})IP(.{7}) /,
    replacement: '$1  $2p',
    tag: 'enPassant',
  },
];

export const movesetMap: Record<string, Moveset[]> = {
    r: rookMoveset,
    R: rookMoveset,
    n: knightMoveset,
    N: knightMoveset,
    b: bishopMoveset,
    B: bishopMoveset,
    q: queenMoveset,
    Q: queenMoveset,
    k: blackKingMoveset,
    K: whiteKingMoveset,
    P: whitepawnMoveset,
    p: blackpawnMoveset,
  };
