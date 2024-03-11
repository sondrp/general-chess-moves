import { ReactNode } from 'react';
import { cn } from '../utils/cn';

type PieceProps = {
  children: ReactNode,
  index: number,
  handleClick: () => void, 
  greenBg: boolean
}


export default function Square(props: PieceProps) {
  const { children, index, handleClick, greenBg } = props

  const x = index % 16;
  const y = ~~(index / 16);
  const isWhite = index % 2 === y % 2;
  const isPadding = x > 7;

  return (
    <button
      onClick={handleClick}
      className={cn(
        'relative flex size-10 xl:size-20 items-center justify-center bg-opacity-50 hover:border',
        isWhite ? 'bg-orange-100' : ' bg-orange-700',
        isPadding && 'hidden',
        greenBg && 'bg-green-900 bg-opacity-50 border-none'
      )}
    >
      {children}
    </button>
  );
}
