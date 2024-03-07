import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';
import { Moveset, amazonMoveset, archBishopMoveset, bishopMoveset, blackkingMoveset, blackpawnMoveset, chancellorMoveset, knightMoveset, queenMoveset, rookMoveset, whitekingMoveset, whitepawnMoveset } from './utils/movesets';

const movesetMap: Record<string, Moveset> = {
  'r': rookMoveset,
  'R': rookMoveset,
  'n': knightMoveset,
  'N': knightMoveset,
  'b': bishopMoveset,
  'B': bishopMoveset,
  'q': queenMoveset,
  'Q': queenMoveset,
  'K': whitekingMoveset,
  'k': blackkingMoveset,
  'P': whitepawnMoveset,
  'p': blackpawnMoveset,
  'a': archBishopMoveset,
  'A': archBishopMoveset,
  'c': chancellorMoveset,
  'C': chancellorMoveset,
  'z': amazonMoveset,
  'Z': amazonMoveset,
}



function App() {
  const [piece, setPiece] = useState('K')
  const [moveset, setMoveset] = useState<Moveset>(whitekingMoveset)
  const [selectedSquare, setSelectedSquare] = useState(0)

  const handlePieceSelect = (piece: string) => {
    const moveset = movesetMap[piece]
    setPiece(piece)
    setMoveset(moveset ?? [])
  }

  return (
    <div className='h-screen p-10'>
      <div className='flex gap-10'>
        <Board
          piece={piece}
          selectedSquare={selectedSquare}
          setSelectedSquare={setSelectedSquare}
          moveset={moveset}
          />
        <div>
          <BehaviourTextArea setMoveset={setMoveset}/>
          <PieceSelect selectedSquare={selectedSquare} handleSelect={handlePieceSelect} />
        </div>
      </div>
    </div>
  );
}


export default App;
