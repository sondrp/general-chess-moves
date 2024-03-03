import { ReactNode } from "react";
import { cn } from "../utils/cn";

export default function Square({ children, index }: Readonly<{ children?: ReactNode; index: number }>) {
    const x = index % 8
    const y = Math.floor(index / 8);
    const isWhite = index % 2 === y % 2;
  
    return (
      <div
        className={cn(
          'relative flex h-20 w-20 items-center justify-center bg-opacity-50',
          isWhite ? 'bg-orange-100' : ' bg-orange-700',
        )}
      >
        {children}
      </div>
    );
  }
  