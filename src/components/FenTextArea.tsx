import { ChangeEvent, useEffect, useState } from 'react';

type BoardTextAreaProps = {
  board: string[];
  setBoard: (board: string[]) => void;
};

const boardToFen = (board: string[]): string => {
  return Array.from({ length: 8 }, (_, i) => board.slice(i * 8, (i + 1) * 8)) // split array into rows
    .map((row) => row.join(''))                                                 // join rows into a string
    .map((row) => row.replace(/\s+/g, (match) => match.length.toString()))      // replace space with the length of the space
    .join('/');                                                                 // combine into fen format
};

export default function FenTextArea(props: BoardTextAreaProps) {
  const { board, setBoard } = props;

  const [error, setError] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    setInput(boardToFen(board));
  }, [board]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let boardstring = e.target.value; // Grab string
    setInput(boardstring);

    // Check if the input can be used to setup the board. Checks only for correct pattern
    if (
      !/^([1-8a-z]{1,8}\/){7}[1-8a-z]{1,8}$/i.test(boardstring)
    ) {
      setError('illegal characters and/or wrong format');
      return;
    }
    boardstring = boardstring.replace(/\d/g, (match) =>
      ' '.repeat(parseInt(match))
    ); // replace numbers with whitespace of that length
    boardstring = boardstring.replace(/\//g, ''); // Remove slashes

    // The board cannot end up with anything other than 64 squares
    if (boardstring.length !== 64) {
      setError('at least one row has incorrect length');
      return;
    }

    setError('');
    setBoard(boardstring.split(''));
  };

  const handleBlur = () => {
    setError('');
    setInput(boardToFen(board));
  };

  return (
    <>
      <div className='flex mt-10 gap-10 items-center'>
        <div className='font-bold text-slate-600 text-opacity-80'>FEN</div>
        <div className='bg-slate-200 flex flex-col rounded-md w-full shadow-inner p-4'>
          <input
            spellCheck='false'
            onBlur={handleBlur}
            onChange={handleChange}
            value={input}
            className='outline-none bg-inherit'
          />
        </div>
      </div>
      {error && (
        <div className='text-thin text-xs text-red-500 text-opacity-50 text-center'>
          Input is not valid: {error}
        </div>
      )}
    </>
  );
}
