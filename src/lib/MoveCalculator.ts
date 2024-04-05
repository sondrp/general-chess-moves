import { GameHistory, GameState, Move } from '../types/types';
import { PseudoMoveCalculator } from './PseudoMoveCalculator';

export class MoveCalculator {
  constructor(
    private pseudoMoveCalculator: PseudoMoveCalculator,
    private gameState: GameState,
    private gameHistory: GameHistory
  ) {}

  legalMoves(square: number): Move[] {
    const board = this.gameState.getBoard();

    const piece = board[square];

    
    if (piece === ' ') return [];
    
    if (!this.gameState.isPieceTurn(piece)) return [];

    return this.pseudoMoveCalculator
      .calculatePseudoLegalMoves(board, square) // generate all possibly legal moves
      .filter((move) => this.gameState.checkState(move)) // filter away moves that are illegal for game specific reasons
      .filter((move) => this.gameHistory.checkHistory(move)); // filter away moves that are illegal for historic reasons
  }
}
