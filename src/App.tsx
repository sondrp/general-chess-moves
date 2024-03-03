import { useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';

export const isInBounds = (index: number, offset: number) => {
  if (index < 0 || 63 < index) return false


  const [x0, y0] = [index % 8, ~~(index / 8)];
  const [dx, dy] = [offset % 8, ~~(offset / 8)];

  const [x1, y1] = [x0 + dx, y0 + dy];

  return 0 <= x1 && x1 < 8 && 0 <= y1 && y1 < 8;
};

function App() {
  const [elephantIndex, setElephantIndex] = useState(-1);
  const [directions, setDirections] = useState<number[]>([]);
  const [beam, setBeam] = useState(false);

  const greenCircles = directions
    .filter((direction) => isInBounds(elephantIndex, direction))
    .map((direction) => elephantIndex + direction);

  const grayCircles: number[] = [];

  beam &&
    directions.forEach((direction) => {
      let square = elephantIndex;
      while (isInBounds(square, direction)) {
        square += direction;
        grayCircles.push(square);
      }
    });

  return (
    <div className='py-20 px-40 flex gap-40 h-screen'>
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
