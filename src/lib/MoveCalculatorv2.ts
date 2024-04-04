import { GameHistory, GameState } from "../types/types";
import { Piece } from "./Piece";


/**
 * Think I have to deal with circular dependencies. No way to 
 */



export class MoveCalculator {
    constructor(private pieceMap: Record<string, Piece>, private gameHistory: GameHistory, private gameState: GameState) {}

}