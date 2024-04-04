export type Move = {
  square: number;
  result: string;
  id: string;
};

export interface GameHistory {
  checkHistory(move: Move): boolean;
  changeHistory(move: Move): void;
}

export interface GameState {
  changeState(move: Move): string[];
  checkState(move: Move): boolean;
  getBoard(): string[];
  isPieceTurn(piece: string): boolean;
}

/**
 * id: used to reference special actions for checks. For example enPassant is an id used to ensure that action is possible at the right time.
 * directions: all the ways the piece can move, following these conditions. 
 * cover: any action that allows for the capture (directly) of an enemy piece. No special move (en passant, castle, pawn forward move) counts as cover.
 * stopBefore: regex defining if a move should be included. friends is default, because no piece can capture a friend
 * stopAfter: regex defining the last move that should be included. Ex: a rook cannot continue moving after having captured a piece.
 * exclude: regex defining a move that should not be included, but not stop the move. Does not exist in normal chess.
 * boardCondition: regex defining what the board must look like to allow a move. Ex: pawn must be on start rank for double move
 * replacement: string defining how the board should update, if more than two squares are involved. Ex: en passant and castle, which moves multiple pieces.
 */
export type Action = {
  id: string;
  directions: string[];
  cover: boolean;
  stopBefore: RegExp;
  stopAfter: RegExp;
  exclude: RegExp;
  boardCondition: RegExp | undefined;
  replacement: string | undefined;
};
