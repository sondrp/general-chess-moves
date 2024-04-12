import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';
import { useGame } from './hooks/useGame';

/* 
  App is responsible for using the correct version of everything. That means we import from version here
*/

function App() {

  const { handleSquareClick, legalMoves, lastClicked, board, setBoard, collectSquares, setCollectSquares
   } =
    useGame('standard');
    

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
          <BehaviourTextArea legalMoves={legalMoves.map(move => move.square)} collectSquares={collectSquares} setCollectSquares={setCollectSquares} />
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
