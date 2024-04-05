import { useEffect, useState } from 'react';
import { Move } from '../types/types';
import { GameFactory } from '../lib/GameFactory';

export const useGame = (version: string) => {
  const gameFactory = new GameFactory();

  const { moveCalculator, moveExecutor, gameOverChecker } =
    gameFactory.create(version);

  const [lastClicked, setLastClicked] = useState(-1);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);

  const [board, setBoard] = useState(moveExecutor.getBoard())

  useEffect(() => {
    console.log('version changed')
  }, [version])

  const handleExternalBoardChange = (board: string[]) => {
    console.log('External board change')
    moveExecutor.setBoard(board)
    setBoard(board)
  }

  const handleSquareClick = (square: number): void => {
    setLastClicked(square);

    const newBoard = moveExecutor.execute(legalMoves, square)

    if (newBoard) {
      setLegalMoves([])
      setBoard(newBoard)

      gameOverChecker.checkGameOver(newBoard)
      return
    }
    
    const newLegalMoves = moveCalculator.legalMoves(square)
    setLegalMoves(newLegalMoves);
  };
  
  return { handleSquareClick, legalMoves, lastClicked, board, setBoard: handleExternalBoardChange };
};
