import { GameHistory, GameState, Move } from "../types/types";

/**
 * Updates game state and history should a move be executed.
 * Returns true if move was executed, false otherwise.
 */
export class MoveExecutor {

    constructor(private gameState: GameState, private gameHistory: GameHistory) {}

    execute(legalMoves: Move[], square: number): boolean {

        const move = legalMoves.find(move => move.square === square)

        if (!move) return false

        this.gameState.changeState(move)
        this.gameHistory.changeHistory(move)

        return true
    }

}