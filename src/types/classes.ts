import { always, friends } from '../utils/regs';

export class Moveset {
  constructor(
    public directions: string[],
    public stopBefore: RegExp,
    public stopAfter: RegExp,
    public tag: string,
    public boardCondition?: RegExp,
    public replacement?: string
  ) {}

  shouldStopBefore(moveDescription: string) {
    return this.stopBefore.test(moveDescription);
  }

  shouldStopAfter(moveDescription: string) {
    return this.stopAfter.test(moveDescription);
  }

  /* Return true if board is ok. This has potential for expansion, because it is not using current square effectively */
  boardCheck(board: string[], startSquare: number): boolean {
    if (!this.boardCondition) return true;

    const boardCopy = [...board];
    boardCopy[startSquare] = 'I'; // To match with regex
    const boardstring = boardCopy.join('');

    return this.boardCondition.test(boardstring);
  }

  makeReplacement(board: string[], startSquare: number, square: number) {
    const boardCopy = [...board];

    if (!this.replacement || !this.boardCondition) {
      // without specialized replacement, just place the piece on the new square
      boardCopy[square] = board[startSquare];
      boardCopy[startSquare] = ' ';
      return boardCopy.join('');
    }

    // Specialized replacement need to use the character I instead of the piece, otherwise matching will not work.
    boardCopy[startSquare] = 'I';

    // return the specialized replacement (like castle or en passant)
    return boardCopy.join('').replace(this.boardCondition, this.replacement);
  }
}

// Moveset builder with shorthand names. Long version are the names of the functions.
export class Mb {
  d: string[] = [];
  sb = friends;
  sa = always;
  t = '';
  bc: RegExp | undefined;
  r: string | undefined;

  directions(d: string[]) {
    this.d = d;
    return this;
  }

  stopBefore(sb: RegExp) {
    this.sb = sb;
    return this;
  }

  stopAfter(sa: RegExp) {
    this.sa = sa;
    return this;
  }

  tag(t: string) {
    this.t = t;
    return this;
  }

  boardCondition(bc: RegExp) {
    this.bc = bc;
    return this;
  }

  replacement(r: string) {
    this.r = r;
    return this;
  }
  build() {
    return new Moveset(this.d, this.sb, this.sa, this.t, this.bc, this.r);
  }
}
