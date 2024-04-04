import { MoveCalculator } from './MoveCalculator';
import { GameHistory, GameState } from '../types/types';
import { StandardGameState } from '../versions/standard/game';
import { StandardGameHistory } from '../versions/standard/history';
import { standardPieceMap } from '../versions/standard/pieceMap';

type FactoryResult = {
  moveCalculator: MoveCalculator;
  gameState: GameState;
  gameHistory: GameHistory;
};

export class GameFactory {

  create(version: string): FactoryResult {

    if (version === 'standard') {
      const moveCalculator = new MoveCalculator(standardPieceMap);
      const gameState = new StandardGameState(moveCalculator);
      const gameHistory = new StandardGameHistory();

      return { moveCalculator, gameState, gameHistory };
    }

    throw Error('Chess version not supported by GameFactory');
  }
}
