/* 
    Function that should take a board and a square, and figure out all moves possible from there.
    For each move, the result should also be computed.
    Historic context is the last thing, not sure what that looks like yet.
*/

import { movesetMap } from '../versions/standard/movesets';
import { isInBounds, parseDirection } from './common';

export type Move = {
  square: number;
  result: string;
  tag?: string;
};

export function moveCalculator(board: string[], startSquare: number) {
  const moves: Move[] = [];

  const boardCopy = [...board];
  boardCopy[startSquare] = 'I';           // To make it possible to match with regex
  const boardstring = boardCopy.join(''); // Need this for boardcheck and replacement

  const piece = board[startSquare];
  const movesets = movesetMap[piece];

  if (!movesets) throw Error('Moveset could not be found for this piece')

  movesets.forEach((moveset) => {
    const { directions, stop, addBreak, boardCondition, replacement, tag } = moveset;
    const offsets = directions.map(parseDirection);
    
    offsets.forEach((offset) => {
      let square = startSquare + offset;
      
      while (isInBounds(square)) {
        const moveDescription = board[startSquare] + board[square];
        
        if (shouldStop(moveDescription, stop)) return;
        if (!boardAcceptable(boardstring, boardCondition)) return;
        

        /* 
        At this point the move is acceptable. Calculate the board 
        should the move be played, and add to move list
        */

        const result = makeReplacement(
          boardCopy,
          piece,
          startSquare,
          square,
          boardCondition,
          replacement
        );
        moves.push({ square, result, tag });
        square += offset
        
        if (shouldBreakAfterAddingMove(moveDescription, addBreak)) return;
      }
    });
  });
  return moves
}

/* If stop condition not provided, it should not stop */
function shouldStop(moveDescription: string, stop: RegExp | undefined) {
  return stop && stop.test(moveDescription);
}

/* If addBreak is not provided, it should stop */
function shouldBreakAfterAddingMove(
  moveDescription: string,
  addBreak: RegExp | undefined
) {
  return !addBreak || addBreak.test(moveDescription);
}

function boardAcceptable (
  boardstring: string,
  boardCondition: RegExp | undefined
) {
  return !boardCondition || boardCondition.test(boardstring);
}

function makeReplacement(
  board: string[],
  piece: string,
  startSquare: number,
  square: number,
  boardCondition: RegExp | undefined,
  replacement: string | undefined
) {
  if (!replacement || !boardCondition) {
    // without specialized replacement, just place the piece on the new square.
    const boardCopy = [...board]
    boardCopy[startSquare] = ' ';
    boardCopy[square] = piece;
    return boardCopy.join('');
  }
  return board.join('').replace(boardCondition, replacement);   // return the specialized replacement (castle, en passant)
}
