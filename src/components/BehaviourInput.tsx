type BehaveProps = {
  collectSquares: number[];
  legalMoves: number[]
  setCollectSquares: (a: number[]) => void;
};

export function BehaviourTextArea(props: BehaveProps) {
  const { collectSquares, setCollectSquares, legalMoves } = props;

  const clicked = `listOf(${collectSquares.join(', ')})`
  const legal = `listOf(${legalMoves.join(', ')})`


  return (
    <div className='border-slate-200'>
      <div className='flex justify-between px-8 h-10 bg-slate-100 rounded-t-md items-center'>
        <button
          onClick={() => navigator.clipboard.writeText(legal)}
          className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center'
        >
          Copy legal
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(legal)}
          className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center'
        >
          Copy clicked
        </button>
        <button
          onClick={() => setCollectSquares([])}
          className='text-white bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-1 text-center'
        >
          Clear clicked
        </button>
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
        <div className='border-2 px-1 resize-none h-80 outline-none leading-8 w-full'>
          <div>clicked = {clicked}</div>
          <div>legal = {legal}</div>
        </div>
      </div>
    </div>
  );
}
