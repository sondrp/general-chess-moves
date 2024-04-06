import { Action } from "../types/types";
import { CoverPatterns, PathPatterns, coverPatterns, pathPatterns } from "../utils/regs";
import { Piece } from "./Piece";


const defaultAction: Action = {
    id: '',
    directions: [],
    path: pathPatterns.leaper,
    cover: coverPatterns.leaper,
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

    type(type: keyof PathPatterns & keyof CoverPatterns) {
      this.next.path = pathPatterns[type]
      this.next.cover = coverPatterns[type]
      return this
    }

    path(path: RegExp | keyof PathPatterns) {
      this.next.path = typeof path === "string" ? pathPatterns[path] : path
      return this
    }

    cover(cover: RegExp | keyof CoverPatterns) {
      this.next.cover = typeof cover === 'string' ? coverPatterns[cover] : cover 
      return this
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