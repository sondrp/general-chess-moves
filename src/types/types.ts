export type Move = {
  square: number;
  result: string;
  id: string;
};

export interface GameOverChecker {
  checkGameOver(board: string[]): boolean;
}

export interface GameHistory {
  checkHistory(move: Move): boolean;
  changeHistory(move: Move): void;
}

export interface GameState {
  changeState(move: Move): string[];
  checkState(move: Move): boolean;
  getBoard(): string[];
  setBoard(board: string[]): void;
  getTurn(): boolean;
  isPieceTurn(piece: string): boolean;
}

/**
 * id: used to reference special actions for checks. For example enPassant is an id used to ensure that action is possible at the right time.
 * directions: all the ways the piece can move, following these conditions.
 * path: describe what the allowed squares look like.
 * cover: describe what the cover looks like.
 * boardCondition: regex defining what the board must look like to allow a move. Ex: pawn must be on start rank for double move
 * replacement: string defining how the board should update, if more than two squares are involved. Ex: en passant and castle, which moves multiple pieces.
 */
export type Action = {
  id: string;
  directions: string[];
  path: RegExp;
  cover: RegExp;
  boardCondition: RegExp | undefined;
  replacement: string | undefined;
};
