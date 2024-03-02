import { ChangeEvent, useState } from 'react';
import Board from './components/Board';
import { BehaviourTextArea } from './components/BehaviourInput';



function App() {
  const [elephant, setElephant] = useState(-1);
  const [greenCircle, setGreenCircle] = useState<number[]>([])


  return (
    <div className='py-20 px-40 flex gap-40 h-screen'>
      <Board elephantIndex={elephant} green={greenCircle} />
      <BehaviourTextArea setElephant={setElephant} setDirections={setGreenCircle} />
    </div>
  );
}


export default App;
