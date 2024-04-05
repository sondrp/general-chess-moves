import { MoveQueue } from '../utils/MoveQueue';
import { Action, Move } from '../types/types';
import { Piece } from './Piece';

const piece = /[a-zA-Z]/;
const black = /[a-z]/;

/**
 * Responsible for analyzing the current board situation.
 * 
 * 
 */
export class PseudoMoveCalculator {
  constructor(private pieceMap: Record<string, Piece>) {}

  public calculatePseudoLegalMoves(board: string[], startSquare: number): Move[] {
    return this.calculate(board, startSquare, false)
  }

  public calculateCover(board: string[], startSquare: number): number[] {
    const moves = this.calculate(board, startSquare, true)
    return moves.map(move => move.square)
  }
  
  public calculateEnemyCover(board: string[], isWhitesTurn: boolean): Move[] {
    return board
      .map((_, i) => i) // need to use the index in move calculation.
      .filter((square) => piece.test(board[square])) // filter empty squares
      .filter((piece) => black.test(board[piece]) === isWhitesTurn) // filter
      .flatMap((enemy) => this.calculate(board, enemy, true));
  }

  /**
   * 
   * @param board to analyse
   * @param whiteKing boolean true to check if white king is in check.
   * @returns true if the selected king is in check
   */
  public isKingInCheck(board: string[], whiteKing: boolean): boolean {

    // Find index of the king
    const kingIndex = board.findIndex((square) =>
      whiteKing ? square === "K" : square === "k"
    );

    // Find all squares the enemy cover, and check if the king is on one of them
    return this
      .calculateEnemyCover(board, whiteKing)
      .some((move) => move.square === kingIndex);
  }

  /**
   * The main workhorse for move calculation. Probably need to rework this!
   * @param board to analyse
   * @param startSquare of the piece to find moves for
   * @param cover toggle if the result should be cover only, or all possible actions
   * @returns a list of moves that the piece can take
   */
  private calculate(board: string[], startSquare: number, cover: boolean): Move[] {
    const moves: Move[] = [];

    const piece = this.pieceMap[board[startSquare]];

    if (!piece) throw Error(`Piece does not exist in piecemap: ${piece}`);

    console.log("needs rework! Not up to code.")

    piece.getActions().filter(action => !cover && !action.cover).forEach((action) => {
      
      action.directions.forEach((direction) => {
        const moveQueue = new MoveQueue(startSquare, direction);

        while (moveQueue.hasNext()) {
          let square = moveQueue.next();
          const moveDescription = board[startSquare] + board[square];

          if (this.shouldStopBefore(action, moveDescription)) return;
          if (!this.boardCheck(action, board, startSquare)) return;

          if (this.shouldExclude(action, moveDescription)) continue;

          /* 
                At this point the move is acceptable. Calculate the board 
                should the move be played, and add to move list
          */

          const result = this.makeReplacement(action, board, startSquare, square);
          moves.push({ square, result, id: action.id });

          if (this.shouldStopAfter(action, moveDescription)) return;
        }
      });
    });
    return moves;
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

  private boardCheck(action: Action, board: string[], startSquare: number): boolean {
    if (!action.boardCondition) return true;

    const boardCopy = [...board];
    boardCopy[startSquare] = 'I'; // To match with regex
    const boardstring = boardCopy.join('');

    return action.boardCondition.test(boardstring);
  }

  private makeReplacement(action: Action, board: string[], startSquare: number, square: number) {
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
    return boardCopy.join('').replace(action.boardCondition, action.replacement);
  }
}

