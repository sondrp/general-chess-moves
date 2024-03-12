import { useEffect, useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';
import { moveCalculator } from './utils/moveCalculator';

import { Move } from './types/types';
import { createGameObjects } from './utils/gameFactory';

/* 
  App is responsible for using the correct version of everything. That means we import from version here
*/

function App() {
  const [version, setVersion] = useState('standard');

  const {
    movesetMap,
    isPieceTurn,
    getBoard,
    executeMove,
    checkGame,
    checkHistory,
    changeHistory,
  } = createGameObjects(version);

  const [lastClicked, setLastClicked] = useState(-1);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);
  const [board, setBoard] = useState(getBoard());

  useEffect(() => {
    setBoard(getBoard());
  }, [version]);

  const handleSquareClick = (square: number): void => {
    setLastClicked(square);

    const moveToExecute = legalMoves.find((move) => move.square === square); // check if clicked square is a move to execute

    if (moveToExecute) {
      setLegalMoves([]);
      const newBoard = executeMove(moveToExecute);
      changeHistory(moveToExecute);
      setBoard(newBoard);
      return;
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
      .filter((move) => checkGame(movesetMap, move)) // Filter away moves that are illegal for game specific reasons
      .filter(checkHistory); // Filter away moves that are illegal for historic reasons

    setLegalMoves(moves);
  };

  return (
    <div className='min-h-screen p-10'>
      <div className='flex gap-10'>
        <Board
          lastClicked={lastClicked}
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
      <div className='mt-10 flex gap-10'>
        <button
          onClick={() => setVersion('standard')}
          className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5'
        >
          Standard
        </button>
        <button
          onClick={() => setVersion('fairy')}
          className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5'
        >
          Fairy
        </button>
      </div>
    </div>
  );
}

export default App;
