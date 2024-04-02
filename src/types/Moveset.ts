import {
  always,
  enemies,
  friends,
  never,
  notEnemies,
  occupied,
} from '../utils/regs';

/* 
  What if we have a class piece with an array of movesets? It makes more sense for everyone I think   
*/

export class Moveset {

  constructor(
    public directions: string[],
    public stopBefore: RegExp,
    public stopAfter: RegExp,
    public exclude: RegExp,
    public tag: string,
    public boardCondition?: RegExp,
    public replacement?: string
  ) {}

  nextDirection() {

  }

  shouldStopBefore(moveDescription: string) {
    return this.stopBefore.test(moveDescription);
  }

  shouldStopAfter(moveDescription: string) {
    return this.stopAfter.test(moveDescription);
  }

  shouldExclude(moveDescription: string) {
    return this.exclude.test(moveDescription);
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
export class MovesetBuilder {
  private d: string[] = [];
  private sb = friends;
  private sa = never;
  private e = never;
  private t = '';
  private bc: RegExp | undefined;
  private r: string | undefined;

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

  exclude(e: RegExp) {
    this.e = e;
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
    return new Moveset(
      this.d,
      this.sb,
      this.sa,
      this.e,
      this.t,
      this.bc,
      this.r
    );
  }
}

export class MovesetDirector {
  rook() {
    return [
      new MovesetBuilder()
        .directions(['E*', 'S*', 'W*', 'N*'])
        .stopAfter(enemies)
        .build(),
    ];
  }

  knight() {
    return [
      new MovesetBuilder()
        .directions(['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'])
        .build(),
    ];
  }

  bishop() {
    return [
      new MovesetBuilder()
        .directions(['NE*', 'SE*', 'SW*', 'NW*'])
        .stopAfter(enemies)
        .build(),
    ];
  }

  queen() {
    return [
      new MovesetBuilder()
        .directions(['NE*', 'E*', 'SE*', 'S*', 'SW*', 'W*', 'NW*', 'N*'])
        .stopAfter(enemies)
        .build(),
    ];
  }

  whiteKing() {
    return [
      new MovesetBuilder()
        .directions(['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'])
        .build(),
      new MovesetBuilder()
        .directions(['EE'])
        .boardCondition(/I  R$/)
        .replacement(' RK ')
        .tag('K')
        .build(),
      new MovesetBuilder()
        .directions(['WW'])
        .boardCondition(/R   I(...)$/)
        .replacement('  KR $1')
        .tag('Q')
        .build(),
    ];
  }

  blackKing() {
    return [
      new MovesetBuilder()
        .directions(['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'])
        .build(),
      new MovesetBuilder()
        .directions(['EE'])
        .boardCondition(/^(....)I  r/)
        .replacement('$1 rk ')
        .tag('k')
        .build(),
      new MovesetBuilder()
        .directions(['WW'])
        .boardCondition(/^r   I/)
        .replacement('  kr ')
        .tag('q')
        .build(),
    ];
  }

  whitePawn() {
    return [
      new MovesetBuilder()
        .directions(['NE', 'NW'])
        .stopBefore(notEnemies)
        .tag('P')
        .build(),
      new MovesetBuilder()
        .directions(['N'])
        .stopBefore(occupied)
        .tag('P')
        .build(),
      new MovesetBuilder()
        .directions(['NN'])
        .stopBefore(occupied)
        .boardCondition(/ .{7}I.{8,15}$/)
        .tag('whitePawnDoubleForward')
        .build(),
      new MovesetBuilder()
        .directions(['NE'])
        .stopBefore(occupied)
        .boardCondition(/ (.{6})Ip(.{32,38})$/)
        .replacement('P$1  $2')
        .tag('enPassant')
        .build(),
      new MovesetBuilder()
        .directions(['NW'])
        .stopBefore(occupied)
        .boardCondition(/ (.{7})pI(.{32,38})$/)
        .replacement('P$1  $2')
        .tag('enPassant')
        .build(),
    ];
  }

  blackPawn() {
    return [
      new MovesetBuilder()
        .directions(['SE', 'SW'])
        .stopBefore(notEnemies)
        .tag('p')
        .build(),
      new MovesetBuilder()
        .directions(['S'])
        .stopBefore(occupied)
        .tag('p')
        .build(),
      new MovesetBuilder()
        .directions(['SS'])
        .stopBefore(occupied)
        .boardCondition(/^.{8,15}I.{7} /)
        .tag('blackPawnDoubleForward')
        .build(),
      new MovesetBuilder()
        .directions(['SE'])
        .stopBefore(occupied)
        .boardCondition(/^(.{32,38})IP(.{7}) /)
        .replacement('$1  $2p')
        .tag('enPassant')
        .build(),
      new MovesetBuilder()
        .directions(['SW'])
        .stopBefore(occupied)
        .boardCondition(/^(.{32,38})PI(.{6}) /)
        .replacement('$1  $2p')
        .tag('enPassant')
        .build(),
    ];
  }
}
