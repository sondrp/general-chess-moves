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
    boardCondition: /I  R(.{8})$/,
    replacement: ' RK $1',
    tag: 'K',
  },
  {
    directions: ['WW'],
    boardCondition: /R   I(.{11})$/,
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
    boardCondition: /^(.{4})I  r/,
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
    boardCondition: / .{15}I.{24,31}$/,
    tag: 'whitePawnDoubleForward'
  },
  {
    directions: ['NE'],
    stop: occupied,
    boardCondition: / (.{14})Ip(.{72,78})$/,
    replacement: 'P$1  $2',
    tag: 'enPassant',
  },
  {
    directions: ['NW'],
    stop: occupied,
    boardCondition: / (.{15})pI(.{72,78})$/,
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
    boardCondition: /^.{16,23}I.{15} /,
    tag: 'blackPawnDoubleForward'
  },
  {
    directions: ['SW'],
    stop: occupied,
    boardCondition: /^(.{64,70})PI(.{14}) /,
    replacement: '$1  $2p',
    tag: 'enPassant',
  },
  {
    directions: ['SE'],
    stop: occupied,
    boardCondition: /^(.{64,70})IP(.{15}) /,
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
