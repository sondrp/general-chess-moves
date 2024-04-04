import { MoveCalculator } from '../../lib/MoveCalculator';
import { GameState, Move } from '../../types/types';

const blackKing = /k/;
const whiteKing = /K/;
const white = /[A-Z]/;

// These squares must be dynamically generated in fisher random
const tagToCastleSquares: Record<string, number[]> = {
  q: [2, 3, 4],
  k: [4, 5, 6],
  Q: [58, 59, 60],
  K: [60, 61, 62],
};

const randint = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min


// Terrible code but it is late...
const initFisher = () => {

  const setup = Array.from({ length: 8 }, () => '')

  const king = randint(1, 6)
  setup[king] = 'k'

  const rook1 = randint(0, king - 1)
  setup[rook1] = 'r'
  
  const rook2 = randint(king + 1, 7)
  setup[rook2] = 'r'

  while (true) {
    const evenBishop = randint(0, 3) * 2
    if (setup[evenBishop]) continue

    setup[evenBishop] = 'b'
    break
  }

  while (true) {
    const oddBishop = randint(0, 3) * 2 + 1
    if (setup[oddBishop]) continue

    setup[oddBishop] = 'b'
    break
  }

  const queen = randint(0, 2)
  let i = 0
  setup.forEach((item, index) => {
    if (item) return

    setup[index] = queen === i ? 'q' : 'n'
    i++
  })

  return setup
};


const gameState = {
  turn: true,
  board: 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR',
  gameActive: true,
};

export class FisherGameState implements GameState {
  constructor(private moveCalculator: MoveCalculator) {
    const blackSetup = initFisher()
    const whiteSetup = blackSetup.map(piece => piece.toUpperCase())

    gameState.board = blackSetup.join('') + gameState.board.slice(8, 56) + whiteSetup.join('')
  }

  executeMove(move: Move): string[] {
    gameState.turn = !gameState.turn;
    gameState.board = move.result;

    const board = move.result.split('');

    // Promote pawn should it reach the final rank
    const { square, tag } = move;
    if (tag === 'P' && ~~(square / 8) === 0) {
      board[square] = 'Q';
    }

    if (tag === 'p' && ~~(square / 8) === 7) {
      board[square] = 'q';
    }

    return board;
  }

  /* Confirms that a move does not break a game specific rule. */
  checkGame(move: Move): boolean {
    if (this.isKingInCheck(move)) return false;

    if (this.illegalCastle(move)) return false;

    return true;
  }

  getBoard() {
    return gameState.board.split('');
  }

  getBoardAsString() {
    return gameState.board;
  }

  isPieceTurn(piece: string) {
    return white.test(piece) === gameState.turn;
  }

  // Helper function used in most versions of chess.
  private isKingInCheck(move: Move): boolean {
    const board = move.result.split('');

    // gameState is where our king would end up
    const kingIndex = board.findIndex((square) =>
      gameState.turn ? whiteKing.test(square) : blackKing.test(square)
    );

    // Find all squares the enemy cover, and check if the king is in it.
    return this.moveCalculator
      .calculateEnemyCover(move.result.split(''), gameState.turn)
      .some((move) => move.square === kingIndex);
  }

  /* Return TRUE only if the move is attempting illegal castle */
  private illegalCastle(move: Move): boolean {
    const { tag, result } = move;
    if (!tag) return false;

    if (!/^[KQkq]$/.test(tag)) return false; // no filter if tag is unrelated

    const squaresToClear = tagToCastleSquares[tag];

    const board = result.split('');
    const enemyCover = this.moveCalculator.calculateEnemyCover(
      board,
      gameState.turn
    );

    // if enemy covers relevant square, do not castle
    return enemyCover.some((move) => squaresToClear.includes(move.square));
  }
}
