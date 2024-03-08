export function getImgUrl(name: string) {
  return new URL(`../assets/${name}.png`, import.meta.url).href;
}

const special = ['a', 'c', 'z'];
const pieces = ['k', 'q', 'r', 'b', 'n', 'p'];

type PieceSelectProps = {
  handleSelect: (piece: string) => void;
  selectedSquare: number;
};

export default function PieceSelect(props: PieceSelectProps) {
  const { handleSelect, selectedSquare } = props;
  return (
    <div className='p-10 w-[30rem] bg-slate-100 rounded-b-md border-slate-200 border-2 h-fit flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='font-bold text-slate-600 text-opacity-80'>Square:</div>
        <div className='outline-none size-10 flex items-center justify-center border border-slate-400 select-none rounded-md shadow-inner bg-white'>
          {selectedSquare}
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='font-bold text-slate-600 text-opacity-80'>Custom:</div>
        <div className='flex gap-2'>
          {special.map((piece) => (
            <div key={piece}>
              <button onClick={() => handleSelect(piece)}>
                <img
                  className='size-10'
                  src={getImgUrl(`b${piece}`)}
                  alt={piece}
                />
              </button>
              <button onClick={() => handleSelect(piece.toUpperCase())}>
                <img
                  className='size-10'
                  src={getImgUrl(`w${piece}`)}
                  alt={piece}
                />
              </button>
            </div>
          ))}
        </div>
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
                src={getImgUrl(`w${piece}`)}
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
                src={getImgUrl(`b${piece}`)}
                alt={piece}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
