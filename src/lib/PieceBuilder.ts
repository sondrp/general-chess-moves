import { Action } from "../types/types";
import { friends, enemies, never } from "../utils/regs";
import { Piece } from "./Piece";


const defaultAction: Action = {
    id: '',
    directions: [],
    cover: true,
    stopBefore: friends,
    stopAfter: enemies,
    exclude: never,
    boardCondition: undefined,
    replacement: undefined,
  };

/**
 * To build one piece, you might have to make many actions first.
 * Define the properties of an action, before .buildAction
 * This will reset the action building, allowing a new action to be created.
 * After all actions have been created, type .buildPiece to return a piece.
 */
export class PieceBuilder {
    // Actions that have been created
    private actions: Action[] = [];
  
    // Setting up the next action
    private next: Action = { ...defaultAction };
  
    /* Add new action to list and reset the next action */
    buildAction() {
      this.actions.push(this.next);
      this.next = { ...defaultAction };
      return this;
    }
  
    /* Make the piece, and reset piecebuilder */
    buildPiece() {
      const piece = new Piece(this.actions);
      this.actions = [];
      this.next = { ...defaultAction }
      return piece;
    }
  
    id(id: string) {
      this.next.id = id;
      return this;
    }
  
    directions(...directions: string[]) {
      this.next.directions = directions;
      return this;
    }

    cover(cover: boolean) {
      this.next.cover = cover
      return this
    }
  
    stopBefore(stopBefore: RegExp) {
      this.next.stopBefore = stopBefore;
      return this;
    }
  
    stopAfter(stopAfter: RegExp) {
      this.next.stopAfter = stopAfter;
      return this;
    }
  
    exclude(exclude: RegExp) {
      this.next.exclude = exclude;
      return this;
    }
  
    boardCondition(boardCondition: RegExp) {
      this.next.boardCondition = boardCondition;
      return this;
    }
  
    replacement(replacement: string) {
      this.next.replacement = replacement;
      return this;
    }
  }