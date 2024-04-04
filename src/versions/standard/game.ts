import { MoveCalculator } from '../../lib/MoveCalculator';
import { GameState, Move } from '../../types/types';

const blackKing = /k/;
const whiteKing = /K/;
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
  board:'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR',
  gameActive: true,
}

export class StandardGameState implements GameState {

  constructor(private moveCalculator: MoveCalculator) {}
  
  executeMove(move: Move): string[] {
    gameState.turn = !gameState.turn;
    gameState.board = move.result;

    const board = move.result.split('');

    // Promote pawn should it reach the final rank
    const { square, tag } = move;
    if (tag === 'P' && ~~(square / 8) === 0) {
      board[square] = 'Q';
    }

    if (tag === 'p' && ~~(square / 8) === 7) {
      board[square] = 'q';
    }

    /* NEED TO ALSO CHECK FOR GAME OVER AFTER EXECUTING A MOVE !!! */

    return board;
  }

  /* Confirms that a move does not break a game specific rule. */
  checkGame(move: Move): boolean {

    if (this.isKingInCheck(move)) return false;

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

  // Helper function used in most versions of chess.
  private isKingInCheck(move: Move): boolean {
    const board = move.result.split('');

    // gameState is where our king would end up
    const kingIndex = board.findIndex((square) =>
    gameState.turn ? whiteKing.test(square) : blackKing.test(square)
    );

    // Find all squares the enemy cover, and check if the king is in it.
    return this.moveCalculator
      .calculateEnemyCover(move.result.split(''), gameState.turn)
      .some((move) => move.square === kingIndex);
  }

  /* Return TRUE only if the move is attempting illegal castle */
  private illegalCastle(move: Move): boolean {
    const { tag, result } = move;
    if (!tag) return false;

    if (!/^[KQkq]$/.test(tag)) return false; // no filter if tag is unrelated

    const squaresToClear = tagToCastleSquares[tag];

    const board = result.split('');
    const enemyCover = this.moveCalculator.calculateEnemyCover(
      board,
      gameState.turn
    );

    // if enemy covers relevant square, do not castle
    return enemyCover.some((move) => squaresToClear.includes(move.square));
  }
}
