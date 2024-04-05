import { useEffect, useState } from 'react';
import { Move } from '../types/types';
import { GameFactory } from '../lib/GameFactory';

export const useGame = (version: string) => {
  const gameFactory = new GameFactory();

  const { moveCalculator, moveExecutor } =
    gameFactory.create(version);

  const [lastClicked, setLastClicked] = useState(-1);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);

  const [board, setBoard] = useState(moveExecutor.getBoard())

  useEffect(() => {
    console.log('version changed')
  }, [version])


  const handleSquareClick = (square: number): void => {
    setLastClicked(square);

    const newBoard = moveExecutor.execute(legalMoves, square)

    
    if (newBoard) {
      setLegalMoves([])
      setBoard(newBoard)
      return
    }
    
    const newLegalMoves = moveCalculator.legalMoves(square)
    setLegalMoves(newLegalMoves);
  };
  
  return { handleSquareClick, legalMoves, lastClicked, board, setBoard };
};
