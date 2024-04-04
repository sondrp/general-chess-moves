import { Action } from '../types/types';
import { MoveQueue } from '../utils/MoveQueue';

/**
 * Piece containing multiple actions. These define
 */
export class Piece implements Iterable<Action> {
  constructor(private actions: Action[]) {}

  cover(square: number): number[] {
    return this.actions
      .filter((action) => action.cover)             // remove actions that are not cover (special moves and pawn forward moves)
      .flatMap((action) => action.directions)       // flatten directions (special conditions do not matter here)
      .flatMap((direction) => [...new MoveQueue(square, direction)]);   // find all moves using the movequeue
  }

  [Symbol.iterator](): Iterator<Action, any, undefined> {
    let index = 0;
    const actions = this.actions;

    return {
      next(): IteratorResult<Action> {
        return index < actions.length
          ? { value: actions[index++], done: false }
          : { value: null, done: true };
      },
    };
  }
}


