import { GameHistory, Move } from '../../types/types';
import { parseDirection } from '../../utils/inBounds';

const rookH1 = /R$/;
const kingF1 = /K...$/;
const rookA1 = /R.{7}$/;

const rookH8 = /^.{7}r/;
const kingF8 = /^.{4}k/;
const rookA8 = /^r/;

const gameHistory = {
  castle: 'KQkq',
  enPassant: -1
  
}

export class StandardGameHistory implements GameHistory {

  checkHistory(move: Move): boolean {
    const { tag, square } = move;
    if (!tag) return true; // no tag means no check - move is acceptable

    if (tag === 'enPassant') {
      return square === gameHistory.enPassant;
    }

    if (/^[KQkq]$/.test(tag)) {
      return gameHistory.castle.includes(tag);
    }

    return true;
  }
  
  changeHistory(move: Move): void {
    const { square, tag, result } = move;

    gameHistory.enPassant = -1;

    // For pawn double moves: add the square behind to history object
    if (tag === 'whitePawnDoubleForward') {
      gameHistory.enPassant = square + parseDirection('S');
    }

    if (tag === 'blackPawnDoubleForward') {
      gameHistory.enPassant = square + parseDirection('N');
    }

    // Check if rooks/kings have moved, and update castle rights accordingly.
    if (gameHistory.castle.includes('q') && !rookA8.test(result)) {
      gameHistory.castle = gameHistory.castle.replace('q', '');
    }

    if (gameHistory.castle.includes('k') && !rookH8.test(result)) {
      gameHistory.castle = gameHistory.castle.replace('k', '');
    }

    if (gameHistory.castle.includes('Q') && !rookA1.test(result)) {
      gameHistory.castle = gameHistory.castle.replace('Q', '');
    }
    if (gameHistory.castle.includes('K') && !rookH1.test(result)) {
      gameHistory.castle = gameHistory.castle.replace('K', '');
    }

    if (!kingF8.test(result)) {
      gameHistory.castle = gameHistory.castle.replace(/[kq]/g, '');
    }

    if (!kingF1.test(result)) {
      gameHistory.castle = gameHistory.castle.replace(/[KQ]/g, '');
    }
  }
}
