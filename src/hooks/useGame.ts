import { useState, useEffect } from 'react';
import { Move } from '../types/types';
import { createGameObjects } from '../utils/gameFactory';
import { moveCalculator } from '../utils/moveCalculator';

export const useGame = (version: string) => {
  const {
    movesetMap,
    isPieceTurn,
    getBoard,
    executeMove,
    checkGame,
    checkHistory,
    changeHistory,
  } = createGameObjects(version);

  const [lastClicked, setLastClicked] = useState(-1);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);
  const [board, setBoard] = useState(getBoard());

  useEffect(() => {
    setBoard(getBoard());
  }, [version]);

  const handleSquareClick = (square: number): void => {
    setLastClicked(square);

    const moveToExecute = legalMoves.find((move) => move.square === square); // check if clicked square is a move to execute

    if (moveToExecute) {
      setLegalMoves([]);
      const newBoard = executeMove(moveToExecute);
      changeHistory(moveToExecute);
      setBoard(newBoard);
      return;
    }

    const piece = board[square];

    if (piece === ' ') {
      setLegalMoves([]);
      return;
    }

    if (!isPieceTurn(piece)) {
      // check if player clicks their own piece
      setLegalMoves([]);
      return;
    }

    const moves = moveCalculator(movesetMap, board, square) // Calculate all potentially legal moves
      .filter((move) => checkGame(movesetMap, move)) // Filter away moves that are illegal for game specific reasons
      .filter(checkHistory); // Filter away moves that are illegal for historic reasons

    setLegalMoves(moves);
  };
  return { handleSquareClick, legalMoves, lastClicked, board, setBoard }
};


