import { GameHistory, GameState, Move } from "../types/types";

/**
 * Updates game state and history should a move be executed.
 * Returns the new board if move was executed, null otherwise.
 */
export class MoveExecutor {

    constructor(private gameState: GameState, private gameHistory: GameHistory) {}

    execute(legalMoves: Move[], square: number): string[] | null {

        const move = legalMoves.find(move => move.square === square)

        if (!move) return null

        const board = this.gameState.changeState(move)
        this.gameHistory.changeHistory(move)

        return board
    }

    getBoard() {
        return this.gameState.getBoard()
    }

    setBoard(board: string[]) {
        this.gameState.setBoard(board)
    }

}