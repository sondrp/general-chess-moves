


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
    tag?: string
  };