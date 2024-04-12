import { Action, Move } from '../types/types';
import { Piece } from './Piece';

const white = /[A-Z]/;

/**
 * Responsible for calculating two things: what a piece can "see" (read: cover) and where a piece can move.
 * These two things are the same for most pieces, but there are exceptions. A pawn covers the squares diagonally in front
 * but cannot necessarily move there. It can move forward, but does not cover these squares. This separation is made
 * because some moves require a cover condition to be met. Castle for example cannot be done if the enemy covers certain squares.
 */
export class SimpleMoveCalculator {
  private offsetMap: Record<string, number> = {
    E: 1,
    S: 8,
    W: -1,
    N: -8,
  };
  constructor(private pieceMap: Record<string, Piece>) {}

  /**
   * The main workhorse of the whole application.
   * This generates all moves that a piece can possibly make.
   * For each move, it also creates what the board will look like,
   * should the move be executed.
   * @param board to analyse
   * @param startSquare of the piece to find moves for
   * @returns a list of moves that the piece can make
   */
  public calculateSimple(board: string[], startSquare: number): Move[] {
    const pieceSymbol = board[startSquare];
    const piece = this.pieceMap[pieceSymbol];
    if (!piece)
      throw Error(
        `Piece does not exist in piecemap (simple move calculation): ${pieceSymbol}`
      );

    return piece
      .getActions()
      .filter((action) => this.boardCheck(action, board, startSquare))
      .flatMap((action) =>
        action.directions.flatMap((direction) =>
          this.generateSquares(action, board, startSquare, direction, true).map(
            (square) => this.makeMove(action, board, startSquare, square)
          )
        )
      );
  }

  /**
   * Calculates all the squares the pieces can see. This is very similar
   * to calculateSimpleMoves, but with a few key differences.
   * 1. Filter away piece actions that are not cover. This is special moves
   * and pawn forward moves.
   * 2. Includes friendly pieces, because these can be covered, but not moved to.
   * 3. No move generation is needed.
   * @param board
   * @param startSquare
   */
  public calculatePieceCover(board: string[], startSquare: number): number[] {
    const pieceSymbol = board[startSquare];
    const piece = this.pieceMap[pieceSymbol];
    if (!piece)
      throw Error(
        `Piece does not exist in piecemap (simple move calculation): ${pieceSymbol}`
      );

    return piece
      .getActions()
      .filter((action) => this.boardCheck(action, board, startSquare))
      .flatMap((action) =>
        action.directions.flatMap((direction) =>
          this.generateSquares(action, board, startSquare, direction, false)
        )
      );
  }

  /**
   * Finds every single square that the white or black pieces cover.
   * @param board to analyse
   * @param teamWhite boolean to specify which team to find cover for
   * @returns an array of indexes for all the covered squares
   */
  public calculateTeamCover(board: string[], teamWhite: boolean): number[] {
    return board
      .map((_, i) => i) // need to use the index in move calculation.
      .filter((square) => board[square] !== ' ') // filter away empty squares
      .filter((piece) => white.test(board[piece]) === teamWhite) // only include the pieces of the correct colour
      .flatMap((piece) => this.calculatePieceCover(board, piece));
  }

  /**
   * Find out if the king is in check by generating all moves the enemy can do.
   * If the resulting board after a move does not include the king, it means that
   * he can be captured, and the king is in check.
   * @param board to analyse
   * @param whiteKing boolean true to check if white king is in check.
   * @returns true if the selected king is in check
   */
  public isKingInCheck(board: string[], whiteKing: boolean): boolean {
    const kingToLookFor = whiteKing ? 'K' : 'k';

    // If we are playing a game without king, he cannot be in check
    if (!board.includes(kingToLookFor)) return false;

    // return true if one of the moves results in a board without a king
    return board
      .map((_, i) => i)
      .filter((i) => board[i] !== ' ') // allow only occupied squares
      .filter((piece) => white.test(board[piece]) !== whiteKing) // pieces of opposite colour to the king
      .flatMap((enemy) => this.calculateSimple(board, enemy))
      .some((move) => move.result.includes(kingToLookFor));
  }

  private generateSquares(
    action: Action,
    board: string[],
    startSquare: number,
    path: string,
    calculatePath: boolean
  ): number[] {
    const squares: number[] = [];
    const directionRegex = /([ESWN]+)([\d\*]*)/g;

    let currentSquare = startSquare;
    let currentPath = board[startSquare];

    let match;
    while ((match = directionRegex.exec(path))) {
      const direction = match[1];
      const offset = this.parseOffset(direction);
      const repetitions = this.parseRepetitions(match[2]);

      let i = 0;
      while (i < repetitions) {
        if (!this.isInBounds(currentSquare, direction)) return squares;

        currentSquare += offset;
        currentPath += board[currentSquare];
        i++;

        if (
          (calculatePath && !action.path.test(currentPath)) ||
          (!calculatePath && !action.cover.test(currentPath))
        )
          return squares;
        squares.push(currentSquare);
      }
    }
    return squares;
  }

  private boardCheck(
    action: Action,
    board: string[],
    startSquare: number
  ): boolean {
    if (!action.boardCondition) return true;

    const boardCopy = [...board];
    boardCopy[startSquare] = 'I'; // To match with regex
    const boardstring = boardCopy.join('');

    return action.boardCondition.test(boardstring);
  }

  private isInBounds(currentSquare: number, direction: string): boolean {
    const chars = [...direction];
    const x0 = currentSquare % 8;
    const y0 = ~~(currentSquare / 8);

    const dx =
      chars.filter((c) => c === 'E').length -
      chars.filter((c) => c === 'W').length;
    const dy =
      chars.filter((c) => c === 'S').length -
      chars.filter((c) => c === 'N').length;

    const x = x0 + dx;
    const y = y0 + dy;

    return 0 <= x && x < 8 && 0 <= y && y < 8;
  }

  public parseOffset(offset: string) {
    return offset.split('').reduce((sum, d) => sum + this.offsetMap[d], 0);
  }

  private parseRepetitions(repetitions: string): number {
    if (repetitions === '') return 7;
    return parseInt(repetitions, 10);
  }

  private makeMove(
    action: Action,
    board: string[],
    startSquare: number,
    square: number
  ): Move {
    let result = '';
    const boardCopy = [...board];

    if (!action.replacement || !action.boardCondition) {
      // without specialized replacement, just place the piece on the new square
      boardCopy[square] = board[startSquare];
      boardCopy[startSquare] = ' ';
      result = boardCopy.join('');
    } else {
      // Specialized replacement need to use the character I instead of the piece, otherwise matching will not work.
      boardCopy[startSquare] = 'I';

      // make the specialized replacement (like castle or en passant)
      result = boardCopy
        .join('')
        .replace(action.boardCondition, action.replacement);
    }
    return { square, result, id: action.id };
  }
}
