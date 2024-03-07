import { ChangeEvent, useState } from 'react';
import { Moveset, bishopMoveset, blackkingMoveset, blackpawnMoveset, knightMoveset, queenMoveset, rookMoveset, whitekingMoveset, whitepawnMoveset } from '../utils/movesets';


type BehaviourProps = {
  setMoveset: (moves: Moveset) => void;
};

const movesetMap: Record<string, Moveset> = {
  'rook': rookMoveset,
  'knight': knightMoveset,
  'bishop': bishopMoveset,
  'queen': queenMoveset,
  'white king': whitekingMoveset,
  'black king': blackkingMoveset,
  'white pawn': whitepawnMoveset,
  'black pawn': blackpawnMoveset
}



export function BehaviourTextArea(props: BehaviourProps) {
  const { setMoveset } = props;

  const [text, setText] = useState('colour = \npiece = ');
  const [changed, setChanged] = useState(false);

  const applyChanges = () => {
    setChanged(false);

    const pieceMatch = /piece *= *(\w+)/.exec(text)
    if (!pieceMatch) return

    const moveset = movesetMap[pieceMatch[1]]
    setMoveset(moveset)


  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChanged(true);
    setText(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      applyChanges();
    }
  };

  return (
    <div className='border-slate-200'>
      <div className='flex justify-between px-8 h-10 bg-slate-100 rounded-t-md items-center'>
        <div className=''>Select Piece</div>
        {changed && (
          <button
            onClick={applyChanges}
            className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center'
          >
            Apply
          </button>
        )}
      </div>
      <div className='flex'>
        <div className='w-8 border-2 flex flex-col bg-slate-100'>
          {Array.from({ length: 9 }, (_, i) => (
            <div
              className='w-full px-1 flex items-center justify-end text-slate-400 text-opacity-70 h-8'
              key={i}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          value={text}
          onKeyDown={handleEnter}
          onChange={handleInputChange}
          spellCheck='false'
          className='border-2 px-1 resize-none h-80 outline-none leading-8 w-full'
        />
      </div>
    </div>
  );
}
