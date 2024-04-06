import { GameHistory, GameOverChecker, GameState } from "../types/types";
import { StandardGameHistory } from "../versions/standard/standardGameHistory";
import { StandardGameOverChecker } from "../versions/standard/standardGameOverChecker";
import { StandardGameState } from "../versions/standard/standardGameState";
import { standardPieceMap } from "../versions/standard/standardPieceMap";
import { MoveCalculator } from "./MoveCalculator";
import { MoveExecutor } from "./MoveExecutor";
import { SimpleMoveCalculator } from "./SimpleMoveCalculator";

type FactoryResult = {
  moveCalculator: MoveCalculator;
  moveExecutor: MoveExecutor
  gameOverChecker: GameOverChecker
};

export class GameFactory {

  create(version: string): FactoryResult {
    let gameState: GameState
    let gameHistory: GameHistory
    let simpleMoveCalculator: SimpleMoveCalculator


    if (version === 'standard') {
      simpleMoveCalculator = new SimpleMoveCalculator(standardPieceMap) 
      gameState = new StandardGameState(simpleMoveCalculator)
      gameHistory = new StandardGameHistory(simpleMoveCalculator)
    } else {
      throw Error(`Game factory does not support ${version} currently`)
    }
    
    const moveCalculator = new MoveCalculator(simpleMoveCalculator, gameState, gameHistory);
    const gameOverChecker = new StandardGameOverChecker(moveCalculator, gameState)
    const moveExecutor = new MoveExecutor(gameState, gameHistory)
    return { moveCalculator, moveExecutor, gameOverChecker };
  }
}
