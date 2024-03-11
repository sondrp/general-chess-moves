import { Move, Moveset, State } from '../../types/types';

const gameState: State = {
  turn: true,
  board:
    '        -------- k q b  --------        -------- n p K  --------        -------- Q R B  --------      N --------        --------',
  gameActive: true,
};

export function executeFairyMove(move: Move) {
    gameState.turn = !gameState.turn
    gameState.board = move.result

    const board = move.result.split('')
    return board
}

export function checkGameFairy(movesetMap: Record<string, Moveset[]>, move: Move): boolean {
    return true
}

export function getBoardFairy() {
    return gameState.board.split('')
  }

const white = /[A-Z]/;
export function isPieceTurnFairy(piece: string) {
  return white.test(piece) === gameState.turn;
}
