import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';
import { useGame } from './hooks/useGame';

/* 
  App is responsible for using the correct version of everything. That means we import from version here
*/

function App() {
  const [version, setVersion] = useState('fisher');

  const { handleSquareClick, legalMoves, lastClicked, board, setBoard } =
    useGame(version);
    

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
      <Buttons setVersion={setVersion} />
    </div>
  );
}

function Buttons({ setVersion }: { setVersion: (version: string) => void }) {
  return (
    <div className='mt-10 flex gap-10'>
      <button
        onClick={() => setVersion('standard')}
        className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5'
      >
        Standard
      </button>
      <button
        onClick={() => setVersion('duck')}
        className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5'
      >
        Duck
      </button>
    </div>
  );
}

export default App;
