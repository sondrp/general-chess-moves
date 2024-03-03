import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';

/* 
  Include the first square in padding (for viewing purposes), but b
*/
const isInBounds = (index: number) => {
  if (index < 0 || 127 < index) return false
  const x = index % 16
  return x < 8
};

function App() {
  const [elephantIndex, setElephantIndex] = useState(-1);
  const [directions, setDirections] = useState<number[]>([]);
  const [beam, setBeam] = useState(false);

  const greenCircles = directions
    .map((direction) => elephantIndex + direction);

  const grayCircles: number[] = [];

  beam &&
    directions.forEach((direction) => {
      let square = elephantIndex;
      while (true) {
        square += direction;
        grayCircles.push(square);
        if (!isInBounds(square)) return
      }
    });


  return (
    <div className='flex p-20 gap-10 h-screen'>
      <Board
        elephantIndex={elephantIndex}
        green={greenCircles}
        gray={grayCircles}
      />
      <BehaviourTextArea
        setElephant={setElephantIndex}
        setDirections={setDirections}
        setBeam={setBeam}
      />
    </div>
  );
}

export default App;
