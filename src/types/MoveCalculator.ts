import { MoveQueue } from '../utils/MoveQueue';
import { Moveset } from './Moveset';
import { Move } from './types';

const piece = /[a-zA-Z]/;
const black = /[a-z]/;


export class MoveCalculator {
  constructor(private movesetMap: Record<string, Moveset[]>) {}

  public calculate(board: string[], startSquare: number) {
    const moves: Move[] = [];

    const piece = board[startSquare];
    const movesets = this.movesetMap[piece];

    if (!movesets) throw Error('Moveset could not be found for this piece');

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

