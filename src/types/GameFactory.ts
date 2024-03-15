import { MoveCalculator } from './MoveCalculator';
import { GameHistory, GameState } from './types';
import { StandardGameState } from '../versions/standard/game';
import { StandardGameHistory } from '../versions/standard/history';
import { standardMovesetMap } from '../versions/standard/movesets';
import { duckMovesetMap } from '../versions/duck/movesets';
import { DuckGameState } from '../versions/duck/game';

type FactoryResult = {
  moveCalculator: MoveCalculator;
  gameState: GameState;
  gameHistory: GameHistory;
};

export class GameFactory {
  create(version: string): FactoryResult {
    if (version === 'standard') {
      const moveCalculator = new MoveCalculator(standardMovesetMap);
      const gameState = new StandardGameState(moveCalculator);
      const gameHistory = new StandardGameHistory();

      return { moveCalculator, gameState, gameHistory };
    }
    
    if (version === 'duck') {
      const moveCalculator = new MoveCalculator(duckMovesetMap)
      const gameState = new DuckGameState(moveCalculator)
      const gameHistory = new StandardGameHistory()
      
      return { moveCalculator, gameState, gameHistory };
    }

    throw Error('Chess version not supported by GameFactory');
  }
}
