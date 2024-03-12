/* 
  MovesetMap is ONLY used here. That means it can be saved as a private value, and life is very very good.
  The factory get it only to give it here. But no need to save it anywhere else.
*/

import { Moveset } from '../types/classes';
import { Move } from '../types/types';
import { isInBounds, parseDirection } from './inBounds';

export function moveCalculator(
  movesetMap: Record<string, Moveset[]>,
  board: string[],
  startSquare: number
) {
  const moves: Move[] = [];

  const piece = board[startSquare];
  const movesets = movesetMap[piece];

  if (!movesets) throw Error('Moveset could not be found for this piece');

  movesets.forEach((moveset) => {
    moveset.directions.forEach((direction) => {
      let square = startSquare;

      while (isInBounds(square, direction)) {
        square += parseDirection(direction);
        const moveDescription = board[startSquare] + board[square];

        if (moveset.shouldStopBefore(moveDescription)) return;
        if (!moveset.boardCheck(board, startSquare)) return;

        /* 
          At this point the move is acceptable. Calculate the board 
          should the move be played, and add to move list
        */

        const result = moveset.makeReplacement(board, startSquare, square);
        moves.push({ square, result, tag: moveset.tag });

        if (moveset.shouldStopAfter(moveDescription)) return;
      }
    });
  });
  return moves;
}
