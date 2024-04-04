import { useEffect, useState } from 'react';
import { Move } from '../types/types';
import { GameFactory } from '../lib/GameFactory';

export const useGame = (version: string) => {
  const gameFactory = new GameFactory();

  const { moveCalculator, gameState, gameHistory } =
    gameFactory.create(version);

  const [lastClicked, setLastClicked] = useState(-1);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);

  const [board, setBoard] = useState(gameState.getBoard())

  useEffect(() => {
    console.log('version changed')
  }, [version])


  const handleSquareClick = (square: number): void => {
    setLastClicked(square);
    
    const moveToExecute = legalMoves.find((move) => move.square === square); // check if clicked square is a move to execute
    
    if (moveToExecute) {
      setLegalMoves([]);
      const newBoard = gameState.executeMove(moveToExecute);
      gameHistory.changeHistory(moveToExecute);
      setBoard(newBoard);
      return;
    }
    
    const piece = board[square];
    
    if (piece === ' ') {
      setLegalMoves([]);
      return;
    }
    
    if (!gameState.isPieceTurn(piece)) {
      // check if player clicks their own piece
      setLegalMoves([]);
      return;
    }
    
    const moves = moveCalculator.calculate(board, square) // Calculate all potentially legal moves
      .filter(move => gameState.checkGame(move)) // Filter away moves that are illegal for game specific reasons
      .filter(move => gameHistory.checkHistory(move)); // Filter away moves that are illegal for historic reasons

    setLegalMoves(moves);
  };
  return { handleSquareClick, legalMoves, lastClicked, board, setBoard };
};
