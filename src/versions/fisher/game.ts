import { GameState, Move } from '../../types/types';

const white = /[A-Z]/;



const randint = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Terrible code but it is late...
const initFisher = () => {
  const setup = Array.from({ length: 8 }, () => '');

  const king = randint(1, 6);
  setup[king] = 'k';

  const rook1 = randint(0, king - 1);
  setup[rook1] = 'r';

  const rook2 = randint(king + 1, 7);
  setup[rook2] = 'r';

  while (true) {
    const evenBishop = randint(0, 3) * 2;
    if (setup[evenBishop]) continue;

    setup[evenBishop] = 'b';
    break;
  }

  while (true) {
    const oddBishop = randint(0, 3) * 2 + 1;
    if (setup[oddBishop]) continue;

    setup[oddBishop] = 'b';
    break;
  }

  const queen = randint(0, 2);
  let i = 0;
  setup.forEach((item, index) => {
    if (item) return;

    setup[index] = queen === i ? 'q' : 'n';
    i++;
  });

  return setup;
};

const gameState = {
  turn: true,
  board: 'rnbqkbnrpppppppp                                PPPPPPPPRNBQKBNR',
  gameActive: true,
};

export class FisherGameState implements GameState {
  constructor() {
    const blackSetup = initFisher();
    const whiteSetup = blackSetup.map((piece) => piece.toUpperCase());

    gameState.board =
      blackSetup.join('') + gameState.board.slice(8, 56) + whiteSetup.join('');
  }

  changeState(move: Move): string[] {
    gameState.turn = !gameState.turn;
    gameState.board = move.result;

    const board = move.result.split('');

    // Promote pawn should it reach the final rank
    const { square, id } = move;
    if (id === 'P' && ~~(square / 8) === 0) {
      board[square] = 'Q';
    }

    if (id === 'p' && ~~(square / 8) === 7) {
      board[square] = 'q';
    }

    return board;
  }

  /* Confirms that a move does not break a game specific rule. */
  checkState(_move: Move): boolean {
    //if (this.isKingInCheck(move)) return false;

    //if (this.illegalCastle(move)) return false;

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

  setBoard(board: string[]): void {
    gameState.board = board.join('');
  }
  getTurn(): boolean {
    return gameState.turn;
  }
}
