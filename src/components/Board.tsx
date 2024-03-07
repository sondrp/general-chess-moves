import Square from './Square';
import { useState } from 'react';
import FenTextArea from './FenTextArea';
import { getPieceImage } from '../utils/getPieceImage';
import { Moveset, chancellor, king, pawn, queen, rook } from '../utils/movesets';
import { parseDirection } from './BehaviourInput';

type BoardProps = {
  directions: number[];
  selectedSquare: number;
  setSelectedSquare: (index: number) => void;
};

// Empty board with padding (128 squares)
const defaultBoard =
  'e   R   xxxxxxxx    R   xxxxxxxx        xxxxxxxx        xxxxxxxx        xxxxxxxx        xxxxxxxx        xxxxxxxxr       xxxxxxxx'
  .split('');

export default function Board(props: BoardProps) {
  const { directions, selectedSquare, setSelectedSquare } = props;

  const [board, setBoard] = useState<string[]>(defaultBoard);

  const moves = moveCalculator(board, selectedSquare, pawn);

  const handleSquareClick = (index: number) => {
    setBoard((oldBoard) => {
      const newBoard = [...oldBoard];
      newBoard[selectedSquare] = ' ';
      newBoard[index] = 'e';
      return newBoard;
    });
    setSelectedSquare(index);
  };

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
                handleClick={() => handleSquareClick(index)}
              >
                {/[ernbqkp]/i.test(board[index]) && (
                  <img
                    className='p-2'
                    src={getPieceImage(board[index])}
                    alt='piece'
                  />
                )}
                {moves?.includes(index) && (
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

const isInBounds = (index: number) => {
  if (index < 0 || 127 < index) return false;
  const x = index % 16;
  return x < 8;
};


function moveCalculator(board: string[], startSquare: number, movesets: Moveset) {
  const moves: number[] = [];
  console.log('s' + board.join('').substring(0, startSquare) + 's')

    movesets.forEach(moveset => {
      const offsets = moveset.directions.map(d => parseDirection(d))
      const { stop, addBreak, boardState } = moveset.condition

      offsets.map(offset => {
        let square = startSquare + offset;
        
        while (isInBounds(square)) {
          let text = board[startSquare] + board[square];
          
          if (stop.test(text)) break;
          if (boardState && !boardState?.test(board.join('').substring(0, startSquare))) break
          
          moves.push(square);
          square += offset;
          
          if (addBreak.test(text)) break;
        }
      })
    })

  return moves;
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
