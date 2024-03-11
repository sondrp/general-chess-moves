type State = {
  turn: boolean; // ture for white's turn
  board: string
  gameActive: boolean   // toggle when game over
};

export const gameState: State = {
  turn: true,
  board: 'rnbqkbnr--------pppppppp--------        --------        --------        --------        --------PPPPPPPP--------RNBQKBNR--------',
  gameActive: true
};

const white = /[A-Z]/;
const blackKing = /k/;
const whiteKing = /K/;

import { Move, Moveset } from '../../types/types';
import { calculateEnemyCover } from '../../utils/common';
import { changeHistory } from './history';

export function executeMove(move: Move) {
  changeHistory(move);
  gameState.turn = !gameState.turn;

  const board = move.result.split('')

  const { square, tag } = move
  if (tag === 'P' && ~~(square / 16) === 0) {
    board[square] = 'Q'
  }

  if (tag === 'p' && ~~(square / 16) === 7) {
    board[square] = 'q'
  }

  /* NEED TO ALSO CHECK FOR GAME OVER AFTER EXECUTING A MOVE !!! */

  return board;
}

/* Confirms that a move does not break a game specific rule. */
export function checkGame(movesetMap: Record<string, Moveset[]>, move: Move): boolean {

  if (isKingInCheck(movesetMap, move)) return false;

  if (illegalCastle(movesetMap, move)) return false

  return true;
}

function isKingInCheck(movesetMap: Record<string, Moveset[]>, move: Move) {
  const board = move.result.split('');

  // This is where our king would end up
  const kingIndex = board.findIndex((square) =>
    gameState.turn ? whiteKing.test(square) : blackKing.test(square)
  );

  // Find all squares the enemy cover, and check if the king is in it.
  return calculateEnemyCover(movesetMap, move.result.split(''), gameState.turn).some(
    (move) => move.square === kingIndex
  );
}

const tagToCastleSquares: Record<string, number[]> = {
  'q': [2, 3, 4],
  'k': [4, 5, 6],
  'Q': [114, 115, 116],
  'K': [116, 117, 118],
}

/* Return TRUE only if the move is attempting illegal castle */
function illegalCastle(movesetMap: Record<string, Moveset[]>, move: Move) {
  const { tag, result } = move
  if (!tag) return false       

  if (!/^[KQkq]$/.test(tag)) return false    // no filter if tag is unrelated

  const squaresToClear = tagToCastleSquares[tag]

  const board = result.split('')
  const enemyCover = calculateEnemyCover(movesetMap, board, gameState.turn)

  // if enemy covers relevant square, do not castle
  return enemyCover.some(move => squaresToClear.includes(move.square))  
}

export function isPieceTurn(piece: string) {
  return white.test(piece) === gameState.turn;
}
