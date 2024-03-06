import Square from './Square';
import { useState } from 'react';
import FenTextArea from './FenTextArea';
import { getPieceImage } from '../utils/getPieceImage';

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

  const moves = moveCalculator(board, selectedSquare);

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
                  <div className='h-4 w-4 rounded-full bg-gray-500 absolute z-10'></div>
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

const never = /gg/;
const white = /[RNBQKP]/;
const black = /[rnbqkp]/;

const enemies = /[RNBQKP][rnbqkpe]|[rnbqkpe][RNBQKP]/;
const friends = /[RNBQKP][RNBQKP]|[rnbqkpe][rnbqkpe]/;

const notEnemies = /[RNBQKP][rnbqkpe ]|[rnbqkpe][RNBQKP ]/;
const notFriends = /[RNBQKP][RNBQKP ]|[rnbqkpe][rnbqkpe ]/;

type Condition = {
  stop: RegExp;
  addBreak: RegExp;
};

export type Move = {
  [key: number]: Condition;
};

const directions: Move = {
  '-16': {
    stop: friends,
    addBreak: enemies,
  },
  1: {
    stop: friends,
    addBreak: enemies,
  },
  16: {
    stop: friends,
    addBreak: notFriends,
  },
  '-1': {
    stop: friends,
    addBreak: notFriends,
  },
};

function moveCalculator(board: string[], startSquare: number) {
  const moves: number[] = [];

  Object.entries(directions).forEach((direction) => {
    const [d, { stop, addBreak }] = direction;
    const offset = parseInt(d);
    let square = startSquare + offset;

    while (isInBounds(square)) {
      let text = board[startSquare] + board[square];

      if (stop.test(text)) break;

      if (addBreak.test(text)) {
        moves.push(square);
        break;
      }

      moves.push(square);
      square += offset;
    }
  });
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
