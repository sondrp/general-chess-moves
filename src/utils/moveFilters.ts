/* 
    This is a function that takes in a move, and checks if it should remain an option,
    given the global rules of the game. 

    Global rules currently are:
    - Not allowed to leave the king in check *
    - En Passant first time a pawn moves two up **
    - Castle under some circumstances **
*/

const piece = /[a-zA-Z]/;
const black = /[a-z]/;
const blackKing = /k/;
const whiteKing = /K/;

import { History } from '../App';
import { Move, moveCalculator } from './moveCalculator';

export function isKingInCheck(move: Move, whitePlaying: boolean) {
  // The board should this move be executed.
  const board = move.result.split('');

  // This is where our king would end up
  const kingIndex = board.findIndex((square) =>
    whitePlaying ? whiteKing.test(square) : blackKing.test(square)
  );

  // Test if the king would be in check, should the move be executed.
  return calculateEnemyCover(move.result.split(''), whitePlaying).some(
    (move) => move.square === kingIndex
  );
}

const castleMatch = /^[KQkq]{1,4}/;


export function isCastleIllegal( move: Move, whitePlaying: boolean, history: History) {

    if (!move.history || !castleMatch.test(move.history)) return true; // there is no castle history to account for => no filtering

    console.log(move.history)
    const enemyCover = calculateEnemyCover(move.result.split(''), whitePlaying)
    
    // Black castle left
    if (!whitePlaying && move.history ==='q') {
      if (!history.castle.includes('q')) return false         
      
      // We now need to check if relevant squares are covered or not
      return !enemyCover.some(move => [2, 3, 4].includes(move.square))        
    }
    
    // black castle right
    if (!whitePlaying && move.history ==='k') {
        if (!history.castle.includes('k')) return false         

        // We now need to check if relevant squares are covered or not
        return !enemyCover.some(move => [4, 5, 6].includes(move.square))        
    }

    // white castle left

    if (whitePlaying && move.history === 'Q') {
        if (!history.castle.includes('Q')) return false   
        

        // We now need to check if relevant squares are covered or not
        return !enemyCover.some(move => [114, 115, 116].includes(move.square))       
    }
    // white castle kingside
    if (whitePlaying && move.history ==='K') {
        if (!history.castle.includes('K')) return false         

        // We now need to check if relevant squares are covered or not
        return !enemyCover.some(move => [116, 117, 118].includes(move.square))       
    }
}

export function enPassantFilter(move: Move, history: History) {
    if (!move.history || move.history !== 'enPassant') return true          

    return history.enPassant === move.square

}








function calculateEnemyCover(board: string[], whitePlaying: boolean): Move[] {
  return board
    .map((_, i) => i) // need to use the index in move calculation.
    .filter((square) => piece.test(board[square])) // filter empty squares
    .filter((piece) => black.test(board[piece]) === whitePlaying) // filter
    .flatMap((enemy) => moveCalculator(board, enemy));
}
