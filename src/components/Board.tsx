import Square from './Square';
import elephantImg from '../assets/e.png';
import { useState } from 'react';
import BoardTextArea from './FenTextArea';

type BoardProps = {
  elephantIndex: number;
  green?: number[];
  gray?: number[];
  selectedSquare: number
  setSelectedSquare: (index: number) => void
};

export default function Board(props: BoardProps) {
  const { elephantIndex, green, gray, selectedSquare, setSelectedSquare } = props;


  const [board, setBoard] = useState(' '.repeat(64));
  const [fen, setFen] = useState('TODO')



  const handleSquareClick = (index: number) => {
    setSelectedSquare(index)
  }


  return (
    <div>
      <div className='flex'>
        <CoordinateNumbers />
        <div className='relative'>
          <div className='grid grid-cols-16 w-fit h-fit'>
            {Array.from({ length: 128 }, (_, index) => (
              <Square selected={selectedSquare} key={index} index={index} handleClick={() => setSelectedSquare(index)}>
                {(elephantIndex === index && (
                  <img className='p-2' src={elephantImg} alt='elephant piece' />
                )) ||
                  (green?.includes(index) && (
                    <div className='h-4 w-4 rounded-full bg-green-500 '></div>
                  )) ||
                  (gray?.includes(index) && (
                    <div className='h-4 w-4 rounded-full bg-gray-500 '></div>
                  ))}
              </Square>
            ))}
          </div>
        </div>
      </div>
      <CoordinateLetters />
      <BoardTextArea fen={fen} setFen={setFen} />
    </div>
  );
}


function CoordinateNumbers() {
  return (
    <div className='flex flex-col w-4'>
      {Array.from({ length: 8 }, (_, i) => (
        <div
          className='grow flex items-center text-slate-400 text-opacity-70'
          key={i}
        >
          {8 - i}
        </div>
      ))}
    </div>
  );
}

function CoordinateLetters() {
  return (
    <div className='flex px-4'>
      {'abcdefgh'.split('').map((letter) => (
        <div
          className='text-slate-400 text-opacity-70 w-10 xl:w-16 text-center'
          key={letter}
        >
          {letter}
        </div>
      ))}
      <div className='w-80 xl:w-[32rem]'></div>
    </div>
  );
}
