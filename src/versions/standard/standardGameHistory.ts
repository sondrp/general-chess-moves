import { GameHistory, Move } from '../../types/types';
import { parseDirection } from '../../lib/MoveQueue';

const rookH1 = /R$/;
const rookA1 = /R.{7}$/;

const rookH8 = /^.{7}r/;
const rookA8 = /^r/;

const gameHistory = {
  castle: 'KQkq',
  enPassant: -1
}

export class StandardGameHistory implements GameHistory {

  checkHistory(move: Move): boolean {
    const { id, square } = move;
    if (!id) return true; // no id means no check - move is acceptable

    if (id === 'enPassant') {
      return square === gameHistory.enPassant;
    }

    if (/^[KQkq]$/.test(id)) {
      return gameHistory.castle.includes(id);
    }

    return true;
  }
  
  changeHistory(move: Move): void {
    const { square, id, result } = move;

    gameHistory.enPassant = -1;

    // For pawn double moves: add the square behind to history object
    if (id === 'wPawnDoubleForward') {
      gameHistory.enPassant = square + parseDirection('S');
    }

    if (id === 'bPawnDoubleForward') {
      gameHistory.enPassant = square + parseDirection('N');
    }

    console.log(id)

    if (/wk|[KQ]/.test(id)) {
      gameHistory.castle = gameHistory.castle.replace(/[KQ]/g, '');
    }

    if (/bk|[kq]/.test(id)) {
      gameHistory.castle = gameHistory.castle.replace(/[kq]/g, '');
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
  }
}
