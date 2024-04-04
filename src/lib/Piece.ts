import { Action } from '../types/types';

/**
 * Piece containing multiple actions. These define the behaviour of a chess piece. Mapping between a symbol from the chessboard
 * (like 'r' meaning black rook) is defined for each chess version.
 */
export class Piece {
  constructor(private actions: Action[]) {}

  getActions() {
    return this.actions
  }

}
