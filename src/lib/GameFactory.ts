import { GameHistory, GameOverChecker, GameState } from "../types/types";
import { StandardGameHistory } from "../versions/standard/standardGameHistory";
import { StandardGameOverChecker } from "../versions/standard/standardGameOverChecker";
import { StandardGameState } from "../versions/standard/standardGameState";
import { standardPieceMap } from "../versions/standard/standardPieceMap";
import { MoveCalculator } from "./MoveCalculator";
import { MoveExecutor } from "./MoveExecutor";
import { PseudoMoveCalculator } from "./PseudoMoveCalculator";

type FactoryResult = {
  moveCalculator: MoveCalculator;
  moveExecutor: MoveExecutor
  gameOverChecker: GameOverChecker
};

export class GameFactory {

  create(version: string): FactoryResult {
    let gameState: GameState
    let gameHistory: GameHistory
    let pseudoMoveCalculator: PseudoMoveCalculator


    if (version === 'standard') {
      pseudoMoveCalculator = new PseudoMoveCalculator(standardPieceMap) 
      gameState = new StandardGameState(pseudoMoveCalculator)
      gameHistory = new StandardGameHistory()
    } else {
      throw Error(`Game factory does not support ${version} currently`)
    }
    
    const moveCalculator = new MoveCalculator(pseudoMoveCalculator, gameState, gameHistory);
    const gameOverChecker = new StandardGameOverChecker(moveCalculator, gameState)
    const moveExecutor = new MoveExecutor(gameState, gameHistory)
    return { moveCalculator, moveExecutor, gameOverChecker };
  }
}
