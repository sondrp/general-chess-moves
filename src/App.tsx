import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';
import { Move, moveCalculator } from './utils/moveCalculator';
import { enPassantFilter, isCastleIllegal, isKingInCheck } from './utils/moveFilters';
import { parseDirection } from './utils/maps';

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

export type History = {
  castle: String,
  enPassant: number
}

const gameHistory = {
  castle: 'KQkq',
  enPassant: -1
}

const white = /[A-Z]/

function App() {
  console.log(gameHistory)

  const [lastClicked, setLastClicked] = useState(-1)

  const [legalMoves, setLegalMoves] = useState<Move[]>([])

  // Would be AMAZING to have this be one big pipeline. But probably not possible?
  // Will see if that is possible.
  const handleSquareClick = (board: string[], square: number): string[] | undefined => {
    const moveToExecute = legalMoves.find(move => move.square === square)
    setLastClicked(square)

    if (moveToExecute) {
      setLegalMoves([])
      state.turn = !state.turn
      return moveExecutor(moveToExecute)
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
                  .filter(move => !isKingInCheck(move, state.turn))
                  .filter(move => isCastleIllegal(move, state.turn, gameHistory))   // filters away illegal castle moves
                  .filter(move => enPassantFilter(move, gameHistory))   // filter illegal en passant moves

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

/* 
  - Update the game
  - Update the gameHistory
    * Remove castle rights if king/rook moves.
    * Add en passant square if pawn moves double.


*/
function moveExecutor(move: Move) {

  if (move.history === 'whitePawnDouble') {
    gameHistory.enPassant = move.square + parseDirection('S')
  }

  if (move.history === 'blackPawnDouble') {
    gameHistory.enPassant = move.square + parseDirection('N')
  }

  if (move.history && /[KQkq]/.test(move.history)) {
    gameHistory.castle.replace(move.history, '')
  }

  // also remove castle based on piece move... 
  const newBoard = move.result.split('')

  const piece = newBoard[move.square]

  if (piece === 'k') {
    gameHistory.castle.replace(/[kq]/g, '')
  }
  if (piece === 'K') {
    gameHistory.castle.replace(/[KQ]/g, '')
  }


  return newBoard
}


export default App;
