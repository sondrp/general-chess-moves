
export type Move = {
  square: number;
  result: string;
  tag?: string;
};

export interface GameHistory {
  checkHistory(move: Move): boolean
  changeHistory(move: Move): void
}

export interface GameState {
  executeMove(move: Move): string[];
  checkGame(move: Move): boolean;
  getBoard(): string[]
  isPieceTurn(piece: string): boolean
}

export type Action = {
  id: string;
  directions: string[];
  stopBefore: RegExp;
  stopAfter: RegExp;
  exclude: RegExp;
  boardCondition: RegExp | undefined;
  replacement: string | undefined;
};