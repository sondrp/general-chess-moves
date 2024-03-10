import {
  Moveset,
  amazonMoveset,
  archBishopMoveset,
  bishopMoveset,
  blackKingMoveset,
  blackpawnMoveset,
  chancellorMoveset,
  knightMoveset,
  queenMoveset,
  rookMoveset,
  whiteKingMoveset,
  whitepawnMoveset,
} from './movesets';

export const isInBounds = (index: number) => {
  if (index < 0 || 127 < index) return false;
  const x = index % 16;
  return x < 8;
};

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
  a: archBishopMoveset,
  A: archBishopMoveset,
  c: chancellorMoveset,
  C: chancellorMoveset,
  z: amazonMoveset,
  Z: amazonMoveset,
};

const directionMap = {
  E: 1,
  S: 16,
  W: -1,
  N: -16,
} as const;

/* 
  Combine a direction string into offset number, following the map above. Example:
  N     -> -16
  SSW   ->  31
*/
export const parseDirection = (direction: string): number => {
  return direction
    .split('')
    .reduce(
      (accumulator: number, value: string) =>
        accumulator + (directionMap[value as keyof typeof directionMap] || 0),
      0
    );
};

