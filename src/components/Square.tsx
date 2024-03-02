import { ReactNode } from "react";
import { cn } from "../utils/cn";

export default function Square({ children, index }: Readonly<{ children?: ReactNode; index: number }>) {
    const x = index % 10
    const y = Math.floor(index / 10);
    const isWhite = index % 2 === y % 2;
    const isPadding = x > 7 || y > 7
  
    return (
      <div
        className={cn(
          'relative flex h-20 w-20 items-center justify-center bg-opacity-50',
          isWhite ? 'bg-orange-100' : ' bg-orange-700',
          isPadding && 'hidden'
        )}
      >
        {children}
      </div>
    );
  }
  