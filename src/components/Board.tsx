import Square from './Square';
import { useState } from 'react';
import FenTextArea from './FenTextArea';
import { getPieceImage } from '../utils/getPieceImage';
import { Move } from '../utils/moveCalculator';



type BoardProps = {
  handleSquareClick: (board: string[], square: number) => string[] | undefined
  moves: Move[]
};

// Board with padding
const defaultBoard =
  'rnbqkbnr--------pppppppp--------        --------        --------        --------        --------PPPPPPPP--------RNBQKBNR--------'
  .split('');

export default function Board(props: BoardProps) {
  const [board, setBoard] = useState(defaultBoard)

  const { handleSquareClick, moves } = props

  const onSquareClick = (index: number) => {
    const newboard = handleSquareClick(board, index)
    if (newboard) {
      setBoard([...newboard])
    }
  } 

  return (
    <div>
      <div className='flex'>
        <CoordinateNumbers />
        <div className='relative'>
          <div className='grid grid-cols-16 xl:w-[80rem] h-fit'>
            {Array.from({ length: 128 }, (_, index) => (
              <Square
                key={index}
                index={index}
                handleClick={() => onSquareClick(index)}
              >
                {/[ernbqkpcza]/i.test(board[index]) && (
                  <img
                    className='p-2'
                    src={getPieceImage(board[index])}
                    alt='piece'
                  />
                )}
                {moves.some(move => move.square === index) && (
                  <div className='h-4 w-4 rounded-full bg-opacity-50 bg-green-600 absolute z-10'></div>
                )}
              </Square>
            ))}
          </div>
        </div>
      </div>
      <CoordinateLetters />
      <FenTextArea board={board} setBoard={setBoard} />
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

