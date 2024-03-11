export type Move = {
  square: number;
  result: string;
  tag?: string;
};

export type Moveset = {
  directions: string[];
  stop?: RegExp;
  addBreak?: RegExp;
  boardCondition?: RegExp;
  replacement?: string;
  tag?: string;
};

export type State = {
  turn: boolean; // ture for white's turn
  board: string;
  gameActive: boolean; // toggle when game over
};
