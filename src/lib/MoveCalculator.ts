import { MoveQueue } from '../utils/MoveQueue';
import { Moveset } from '../types/Moveset';
import { Move } from '../types/types';
import { Piece } from './Piece';

const piece = /[a-zA-Z]/;
const black = /[a-z]/;

/* 
  Rework move calculator.
  It will now contain all the action checks here. This is so obviously better because we are creating a billion actions
  (no need to create the same functions each time).

  It should also have access to historic and game specific filters. This is to allow use in both game over checker and e
*/

export class MoveCalculator {
  constructor(private pieceMap: Record<string, Piece>) {}

  public calculate(board: string[], startSquare: number) {
    const moves: Move[] = [];

    const piece = board[startSquare];
    const movesets = this.movesetMap[piece];

    if (!movesets) throw Error(`Moveset could not be found for this piece: ${piece}`);

    movesets.forEach((moveset) => {
      
      moveset.directions.forEach((direction) => {
        const moveQueue = new MoveQueue(startSquare, direction);

        while (moveQueue.hasNext()) {
          let square = moveQueue.next();
          const moveDescription = board[startSquare] + board[square];

          if (moveset.shouldStopBefore(moveDescription)) return;
          if (!moveset.boardCheck(board, startSquare)) return;

          if (moveset.shouldExclude(moveDescription)) continue;

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
  public calculateEnemyCover(board: string[], isWhitesTurn: boolean): Move[] {
    return board
      .map((_, i) => i) // need to use the index in move calculation.
      .filter((square) => piece.test(board[square])) // filter empty squares
      .filter((piece) => black.test(board[piece]) === isWhitesTurn) // filter
      .flatMap((enemy) => this.calculate(board, enemy));
  }
}

