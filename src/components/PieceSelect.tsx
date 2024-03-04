function getImgUrl(name: string) {
  return new URL(`${name}`, import.meta.url).href;
}

import e from '../assets/e.png';

const pieces = ['k', 'q', 'r', 'b', 'n', 'p'];

export default function PieceSelect({
  handleSelect,
  selectedSquare
}: {
  handleSelect: (piece: string) => void;
  selectedSquare: number
}) {
  return (
    <div className='p-10 w-[30rem] bg-slate-100 rounded-b-md border-slate-200 border-2 h-fit flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='font-bold text-slate-600 text-opacity-80'>Square:</div>
        <div className='outline-none size-10 flex items-center justify-center border border-slate-400 select-none rounded-md shadow-inner bg-white'>{selectedSquare}</div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='font-bold text-slate-600 text-opacity-80'>Special:</div>
        <button onClick={() => handleSelect('e')}>
          <img className='size-10' src={e} alt='select elephant ' />
        </button>
      </div>

      <div className='flex items-center justify-between'>
        <div className='font-bold text-slate-600 text-opacity-80'>White:</div>
        <div className='flex gap-2'>
          {pieces.map((piece) => (
            <button
              onClick={() => handleSelect(piece.toUpperCase())}
              key={piece}
            >
              <img
                className='size-10'
                src={getImgUrl(`../assets/w${piece}.png`)}
                alt={piece}
              />
            </button>
          ))}
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='font-bold text-slate-600 text-opacity-80'>Black:</div>
        <div className='flex gap-2'>
          {pieces.map((piece) => (
            <button onClick={() => handleSelect(piece)} key={piece}>
              <img
                className='size-10'
                src={getImgUrl(`../assets/b${piece}.png`)}
                alt={piece}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
