import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';
import PieceSelect from './components/PieceSelect';

const isInBounds = (index: number) => {
  if (index < 0 || 127 < index) return false;
  const x = index % 16;
  return x < 8;
};

function App() {
  const [elephantIndex, setElephantIndex] = useState(-1);
  const [directions, setDirections] = useState<number[]>([]);
  const [beam, setBeam] = useState(false);

  const greenCircles = directions.map((direction) => elephantIndex + direction);

  const grayCircles: number[] = [];

  beam &&
    directions.forEach((direction) => {
      let square = elephantIndex;
      while (true) {
        square += direction;
        grayCircles.push(square);
        if (!isInBounds(square)) return; // This will include the first out of bounds square, done for viewing purposes.
      }
    });


    const [selectedSquare, setSelectedSquare] = useState(-1)

  return (
    <div className='h-screen p-10'>
      <div className='flex gap-10'>
        <Board
          selectedSquare={selectedSquare}
          setSelectedSquare={setSelectedSquare}
          elephantIndex={elephantIndex}
          green={greenCircles}
          gray={grayCircles}
        />
        <div>
          <BehaviourTextArea
            setElephant={setElephantIndex}
            setDirections={setDirections}
            setBeam={setBeam}
          />
          <PieceSelect selectedSquare={selectedSquare} handleSelect={(piece: string) => console.log(piece)} />
        </div>
      </div>
    </div>
  );
}

export default App;
