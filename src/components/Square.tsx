import { ReactNode } from 'react';
import { cn } from '../utils/cn';

type PieceProps = {
  children: ReactNode,
  index: number,
  handleClick: () => void, 
  selected: number
}


export default function Square(props: PieceProps) {
  const { children, index, handleClick, selected } = props

  const x = index % 16;
  const y = ~~(index / 16);
  const isWhite = index % 2 === y % 2;
  const isPadding = x > 7;

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative flex size-10 xl:size-16 items-center justify-center bg-opacity-50 hover:border',
        isWhite ? 'bg-orange-100' : ' bg-orange-700',
        isPadding && 'opacity-20',
      )}
    >
      <div className={cn('size-full', selected === index && 'rounded-full border-4 border-green-400 border-opacity-50')}>

        {children}
      </div>
    </button>
  );
}
