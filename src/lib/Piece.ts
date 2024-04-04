import { Action } from "../types/types";

/**
 * Holds information about all the actions a piece can make.
 * Easy to iterate over all actions.
 */
export class Piece implements Iterable<Action> {
    constructor(private actions: Action[]) {}
  
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
  