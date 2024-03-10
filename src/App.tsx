import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';
import { Move, moveCalculator } from './utils/moveCalculator';

/* 
  It is time to make a game of chess. Should start off with standard board at least.
  Now we need to keep track of whose turn it is. And we need a list of available squares.

  Define all top level functionality in the app? Sure.
*/

type State = {
  turn: boolean     // true for white
}

const state: State = {
  turn: true
}

const history = {
  castle: 'KQkq',
}

const white = /[A-Z]/

function App() {

  const [legalMoves, setLegalMoves] = useState<Move[]>([])

  // Would be AMAZING to have this be one big pipeline. But probably not possible?
  // Will see if that is possible.
  const handleSquareClick = (board: string[], square: number): string[] | undefined => {
    const moveToExecute = legalMoves.find(move => move.square === square)
    if (moveToExecute) {
      setLegalMoves([])
      state.turn = !state.turn
      return moveToExecute.result.split('')
    }
    const piece = board[square]

    if (piece === ' ') {
      setLegalMoves([])
      return
    }

    if (white.test(piece) !== state.turn) {   // check if player clicks on own piece
      setLegalMoves([])
      return
    }

    const moves = moveCalculator(board, square)

    // then some filtering process here, taking history into account

    setLegalMoves(moves)
  }

  return (
    <div className='h-screen p-10'>
      <div className='flex gap-10'>
        <Board
          handleSquareClick={handleSquareClick}
          moves={legalMoves}
          />
        <div>
          <BehaviourTextArea />
          <PieceSelect selectedSquare={-1} handleSelect={(piece: string) => console.log(piece)} />
        </div>
      </div>
    </div>
  );
}



export default App;
