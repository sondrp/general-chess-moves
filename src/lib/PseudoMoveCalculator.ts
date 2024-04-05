import { MoveQueue } from './MoveQueue';
import { Action, Move } from '../types/types';
import { Piece } from './Piece';
import { occupied } from '../utils/regs';

const white = /[A-Z]/;

const noWhiteKing = /^[^K]*$/;
const noBlackKing = /^[^k]*$/;

/**
 * Responsible for calculating two things: what a piece can "see" (read: cover) and where a piece can move.
 * These two things are the same for most pieces, but there are exceptions. A pawn covers the squares diagonally in front
 * but cannot necessarily move there. It can move forward, but does not cover these squares. This separation is made
 * because some moves require a cover condition to be met. Castle for example cannot be done if the enemy covers certain squares.
 */
export class PseudoMoveCalculator {
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
  public calculatePseudoLegalMoves(
    board: string[],
    startSquare: number
  ): Move[] {
    const moves: Move[] = [];

    const pieceSymbol = board[startSquare]
    const piece = this.pieceMap[pieceSymbol];
    if (!piece) throw Error(`Piece does not exist in piecemap (pseudomove calculation): ${pieceSymbol}`);

    piece.getActions().forEach((action) => {
      action.directions.forEach((direction) => {
        const moveQueue = new MoveQueue(startSquare, direction);

        while (moveQueue.hasNext()) {
          let square = moveQueue.next();
          const moveDescription = board[startSquare] + board[square];

          if (this.shouldStopBefore(action, moveDescription)) return;
          if (!this.boardCheck(action, board, startSquare)) return;

          if (this.shouldExclude(action, moveDescription)) continue;

          /* 
            At this point the move is acceptable. Generate "result", which
            is the new board should this move be played.
            Add the move to list of moves. End by checking if this is the last
            move that should be included.
          */

          const result = this.makeReplacement(
            action,
            board,
            startSquare,
            square
          );
          moves.push({ square, result, id: action.id });

          if (this.shouldStopAfter(action, moveDescription)) return;
        }
      });
    });
    return moves;
  }

  /**
   * Calculates all the squares the pieces can see. This is very similar
   * to calculatePseudoLegalMoves, but with a few key differences.
   * 1. Filter away piece actions that are not cover. This is special moves
   * and pawn forward moves.
   * 2. Only stopAfter and stopBefore conditions are considered.
   * 3. No generation of result should the move be played.
   * @param board
   * @param startSquare
   */
  public calculatePieceCover(board: string[], startSquare: number): number[] {
    const pieceSybol = board[startSquare]
    const piece = this.pieceMap[pieceSybol];

    if (!piece) throw Error(`Piece does not exist in piecemap (cover calculation): ${piece}`);

    return piece
      .getActions()
      .filter((action) => action.isCover) // remove actions that do not count as cover
      .flatMap((action) =>  // combine the result of all actions into one array
        action.directions.flatMap((direction) =>  // combine the result of all directions into one array
          new MoveQueue(startSquare, direction).takeUntil(board, occupied)  // include squares until the square is occupied
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
      .filter(square => board[square] !== ' ') // filter away empty squares
      .filter(piece => white.test(board[piece]) === teamWhite) // only include the pieces of the correct colour
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
    const kingHasBeenCaptured = whiteKing ? noWhiteKing : noBlackKing; // select which king to look for

    // If we are playing a game without king, he cannot be in check
    if (kingHasBeenCaptured.test(board.join(""))) return false

    return board
      .map((_, i) => i)
      .filter((i) => board[i] !== ' ') // allow only occupied squares
      .filter((piece) => white.test(board[piece]) !== whiteKing) // pieces of opposite colour to the king
      .flatMap((enemy) => this.calculatePseudoLegalMoves(board, enemy))
      .some((move) => kingHasBeenCaptured.test(move.result));
  }

  private shouldStopBefore(action: Action, moveDescription: string) {
    return action.stopBefore.test(moveDescription);
  }

  private shouldStopAfter(action: Action, moveDescription: string) {
    return action.stopAfter.test(moveDescription);
  }

  private shouldExclude(action: Action, moveDescription: string) {
    return action.exclude.test(moveDescription);
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

  private makeReplacement(
    action: Action,
    board: string[],
    startSquare: number,
    square: number
  ) {
    const boardCopy = [...board];

    if (!action.replacement || !action.boardCondition) {
      // without specialized replacement, just place the piece on the new square
      boardCopy[square] = board[startSquare];
      boardCopy[startSquare] = ' ';
      return boardCopy.join('');
    }

    // Specialized replacement need to use the character I instead of the piece, otherwise matching will not work.
    boardCopy[startSquare] = 'I';

    // return the specialized replacement (like castle or en passant)
    return boardCopy
      .join('')
      .replace(action.boardCondition, action.replacement);
  }
}
