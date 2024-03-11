/* 
    This is a function that takes in a move, and checks if it should remain an option,
    given the global rules of the game. 

    Global rules currently are:
    - Not allowed to leave the king in check *
    - En Passant first time a pawn moves two up **
    - Castle under some circumstances **
*/

const piece = /[a-zA-Z]/;
const black = /[a-z]/;

import { Move, Moveset } from '../types/types';
import { moveCalculator } from './moveCalculator';

export function calculateEnemyCover(
  movesetMap: Record<string, Moveset[]>,
  board: string[],
  whitePlaying: boolean
): Move[] {
  return board
    .map((_, i) => i) // need to use the index in move calculation.
    .filter((square) => piece.test(board[square])) // filter empty squares
    .filter((piece) => black.test(board[piece]) === whitePlaying) // filter
    .flatMap((enemy) => moveCalculator(movesetMap, board, enemy));
}

export const isInBounds = (index: number) => {
  if (index < 0 || 127 < index) return false;
  const x = index % 16;
  return x < 8;
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
