import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';
import { Move, moveCalculator } from './utils/moveCalculator';
import { checkHistory } from './versions/standard/history';
import { checkGame, executeMove, isPieceTurn } from './versions/standard/game';


function App() {

  const [lastClicked, setLastClicked] = useState(-1)
  const [legalMoves, setLegalMoves] = useState<Move[]>([])

  const handleSquareClick = (board: string[], square: number): string[] | undefined => {
    setLastClicked(square)

    const moveToExecute = legalMoves.find(move => move.square === square) // check if clicked square is a move to execute

    if (moveToExecute) {
      setLegalMoves([])
      return executeMove(moveToExecute)
    }

    const piece = board[square]

    if (piece === ' ') {
      setLegalMoves([])
      return
    }

    if (!isPieceTurn(piece)) {   // check if player clicks their own piece
      setLegalMoves([])
      return
    }

    const moves = moveCalculator(board, square) // Calculate all potentially legal moves
                  .filter(checkGame)            // Filter away moves that are illegal for game specific reasons
                  .filter(checkHistory)         // Filter away moves that are illegal for historic reasons

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
          <PieceSelect selectedSquare={lastClicked} handleSelect={(piece: string) => console.log(piece)} />
        </div>
      </div>
    </div>
  );
}

export default App;
