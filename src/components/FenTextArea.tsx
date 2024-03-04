
type BoardTextAreaProps = {
  fen: string;
  setFen: (a: string) => void;
};

export default function FenTextArea(props: BoardTextAreaProps) {


  return (
    <div className='flex mt-10 gap-10 items-center'>
      <div className='font-bold text-slate-600 text-opacity-80'>FEN</div>
      <div className='bg-slate-200 flex flex-col rounded-md w-full shadow-inner p-4'>
        <input className='outline-none bg-inherit' />
      </div>
    </div>
  );
}
