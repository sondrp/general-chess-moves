import Square from './Square';
import { useEffect, useState } from 'react';
import FenTextArea from './FenTextArea';
import { getPieceImage } from '../utils/getPieceImage';
import { Moveset } from '../utils/movesets';

type BoardProps = {
  piece: string
  moveset: Moveset;
  selectedSquare: number;
  setSelectedSquare: (index: number) => void;
};

// Empty board with padding (128 squares)
const defaultBoard =
  'K   R   xxxxxxxx    R   xxxxxxxx        xxxxxxxx        xxxxxxxx        xxxxxxxx        xxxxxxxx        xxxxxxxxr       xxxxxxxx'
  .split('');

export default function Board(props: BoardProps) {
  const { piece, moveset, selectedSquare, setSelectedSquare } = props;

  const [board, setBoard] = useState<string[]>(defaultBoard);

  const moves = moveCalculator(board, selectedSquare, moveset);

  const handleSquareClick = (index: number) => {
    updateBoard(index)
    setSelectedSquare(index);
  };
  
  useEffect(() => {
    updateBoard(selectedSquare)
  }, [piece])

  const updateBoard = (index: number) => {
    setBoard((oldBoard) => {
      const newBoard = [...oldBoard];
      newBoard[selectedSquare] = ' ';
      newBoard[index] = piece;
      return newBoard;
    });
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
                handleClick={() => handleSquareClick(index)}
              >
                {/[ernbqkpcza]/i.test(board[index]) && (
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
  const boardstring = board.join('')
  const boardstringBefore = boardstring.substring(0, startSquare)
  const boardstringAfter = boardstring.substring(startSquare + 1)

  console.log(boardstringBefore)
  console.log(boardstringAfter)

    movesets.forEach(moveset => {
      const offsets = moveset.directions.map(d => parseDirection(d))
      const { stop, addBreak, boardBefore, boardAfter } = moveset.condition

      offsets.map(offset => {
        let square = startSquare + offset;
        
        while (isInBounds(square)) {
          let text = board[startSquare] + board[square];
          
          console.log(stop.test(text))

          if (stop.test(text)) break;

          if (boardBefore && !boardBefore.test(boardstringBefore)) break
          if (boardAfter && !boardAfter.test(boardstringAfter)) break
          
          moves.push(square);
          square += offset;
          
          if (addBreak.test(text)) break;
        }
      })
    })

  return moves;
}


const directionMap = {
  E: 1,
  S: 16,
  W: -1,
  N: -16,
} as const;

/* 
  Combine a direction string into offset number, following the map above. Example:
  N     -> -16
  SSW   -> 31
*/
export const parseDirection = (direction: string): number => {
  return direction
    .split('')
    .reduce(
      (accumulator: number, value: string) =>
        accumulator + (directionMap[value as keyof typeof directionMap] || 0),
      0
    );
};


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
