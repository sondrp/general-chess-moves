/* 
    Function that should take a board and a square, and figure out all moves possible from there.
    For each move, the result should also be computed.
    Historic context is the last thing, not sure what that looks like yet.
*/

import { Move, Moveset } from '../types/types';
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
    const { directions, stop, addBreak, boardCondition, replacement, tag } = moveset;


    directions.forEach((direction) => {
      let square = startSquare;
      
      while (isInBounds(square, direction)) {
        square += parseDirection(direction)
        const moveDescription = board[startSquare] + board[square];

        if (shouldStop(moveDescription, stop)) return;
        if (!boardAcceptable(board, startSquare, boardCondition)) return;

        /* 
        At this point the move is acceptable. Calculate the board 
        should the move be played, and add to move list
        */

        const result = makeReplacement(
          board,
          startSquare,
          square,
          boardCondition,
          replacement
        );
        moves.push({ square, result, tag });

        if (shouldBreakAfterAddingMove(moveDescription, addBreak)) return;
      }
    });
  });
  return moves;
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

function boardAcceptable(
  board: string[],
  startSquare: number,
  boardCondition: RegExp | undefined
) {
  if (!boardCondition) return true
  
  const boardCopy = [...board];
  boardCopy[startSquare] = 'I'; // To make it possible to match with regex
  const boardstring = boardCopy.join(''); // Need this for boardcheck and replacement

  return boardCondition.test(boardstring);
}

function makeReplacement(
  board: string[],
  startSquare: number,
  square: number,
  boardCondition: RegExp | undefined,
  replacement: string | undefined
) {
  const boardCopy = [...board];

  if (!replacement || !boardCondition) {
    // without specialized replacement, just place the piece on the new square.
    boardCopy[square] = board[startSquare];
    boardCopy[startSquare] = ' ';
    return boardCopy.join('');
  }

  // Specialized replacement need to use the character I instead of the piece, otherwise matching will not work.
  boardCopy[startSquare] = 'I';

  // return the specialized replacement (like castle or en passant)
  return boardCopy.join('').replace(boardCondition, replacement);
}
