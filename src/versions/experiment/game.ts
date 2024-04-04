import { MoveCalculator } from "../../lib/PseudoMoveCalculator";
import { GameState, Move } from "../../types/types";

const gameState = {
    turn: true,
    board:' R                           R                                 R',
}

export class TestGameState implements GameState {

    constructor(private moveCalculator: MoveCalculator) {}


    executeMove(move: Move): string[] {
        gameState.board = move.result
        return gameState.board.split('')
    }
    checkGame(move: Move): boolean {
        return true
    }
    getBoard(): string[] {
        return gameState.board.split('')
    }
    isPieceTurn(piece: string): boolean {
        return true
    }
}