import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';
import { moveCalculator } from './utils/moveCalculator';
import { checkHistory } from './versions/standard/history';
import {
  checkGame,
  executeMove,
  gameState,
  isPieceTurn,
} from './versions/standard/game';
import { Move } from './types/types';
import { movesetMap } from './versions/standard/movesets';

/* 
  App is responsible for using the correct version of everything. That means we import from version here
*/

function App() {
  const [lastClicked, setLastClicked] = useState(-1);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);
  const [board, setBoard] = useState(gameState.board.split(''));

  const handleSquareClick = (square: number): void => {
    setLastClicked(square);

    const moveToExecute = legalMoves.find((move) => move.square === square); // check if clicked square is a move to execute

    if (moveToExecute) {
      setLegalMoves([]);
      const newBoard = executeMove(moveToExecute);
      setBoard(newBoard)
      return
    }

    const piece = board[square];

    if (piece === ' ') {
      setLegalMoves([]);
      return;
    }

    if (!isPieceTurn(piece)) {
      // check if player clicks their own piece
      setLegalMoves([]);
      return;
    }

    const moves = moveCalculator(movesetMap, board, square) // Calculate all potentially legal moves
      .filter(move => checkGame(movesetMap, move)) // Filter away moves that are illegal for game specific reasons
      .filter(checkHistory); // Filter away moves that are illegal for historic reasons

    setLegalMoves(moves);
  };

  return (
    <div className='h-screen p-10'>
      <div className='flex gap-10'>
        <Board
          board={board}
          setBoard={setBoard}
          handleSquareClick={handleSquareClick}
          moves={legalMoves}
        />
        <div>
          <BehaviourTextArea />
          <PieceSelect
            selectedSquare={lastClicked}
            handleSelect={(piece: string) => console.log(piece)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
