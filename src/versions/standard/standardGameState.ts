import { PseudoMoveCalculator } from '../../lib/PseudoMoveCalculator';
import { GameState, Move } from '../../types/types';


const white = /[A-Z]/;

// These squares must not be covered by the enemy when castleing
const tagToCastleSquares: Record<string, number[]> = {
  q: [2, 3, 4],
  k: [4, 5, 6],
  Q: [58, 59, 60],
  K: [60, 61, 62],
};

const gameState = {
  turn: true,
  board: 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR',
  gameActive: true,
};

export class StandardGameState implements GameState {
  constructor(private pseudoMoveCalculator: PseudoMoveCalculator) {}

  changeState(move: Move): string[] {
    gameState.turn = !gameState.turn;

    const board = move.result.split('');

    // Promote pawn should it reach the final rank
    const { square, id } = move;
    if (id === 'P' && ~~(square / 8) === 0) {
      board[square] = 'Q';
    }

    if (id === 'p' && ~~(square / 8) === 7) {
      board[square] = 'q';
    }

    gameState.board = move.result;
    return gameState.board.split('');
  }

  /* Confirms that a move does not break a game specific rule. */
  checkState(move: Move): boolean {
    if (this.pseudoMoveCalculator.isKingInCheck(move.result.split(''), gameState.turn)) return false;

    if (this.illegalCastle(move)) return false;

    return true;
  }

  getBoard() {
    return gameState.board.split('');
  }

  getBoardAsString() {
    return gameState.board;
  }

  isPieceTurn(piece: string) {
    return white.test(piece) === gameState.turn;
  }


  /* Return TRUE only if the move is attempting illegal castle */
  private illegalCastle(move: Move): boolean {
    const { id, result } = move;
    if (!id) return false;

    if (!/^[KQkq]$/.test(id)) return false; // no filter if tag is unrelated

    const squaresToClear = tagToCastleSquares[id];

    const board = result.split('');
    const enemyCover = this.pseudoMoveCalculator.calculateEnemyCover(
      board,
      gameState.turn
    );

    // if enemy covers relevant square, do not castle
    return enemyCover.some((move) => squaresToClear.includes(move.square));
  }
}
