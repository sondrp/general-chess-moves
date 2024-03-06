import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';



function App() {
  const [selectedSquare, setSelectedSquare] = useState(0)
  const [directions, setDirections] = useState<number[]>([]);


  return (
    <div className='h-screen p-10'>
      <div className='flex gap-10'>
        <Board
          selectedSquare={selectedSquare}
          setSelectedSquare={setSelectedSquare}
          directions={directions}
        />
        <div>
          <BehaviourTextArea
            setDirections={setDirections}
          />
          <PieceSelect selectedSquare={selectedSquare} handleSelect={(piece: string) => console.log(piece)} />
        </div>
      </div>
    </div>
  );
}


export default App;
