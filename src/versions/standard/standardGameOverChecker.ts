import { MoveCalculator } from "../../lib/MoveCalculator";
import { GameOverChecker, GameState } from "../../types/types";

const white = /[A-Z]/;

export class StandardGameOverChecker implements GameOverChecker {

    constructor(private moveCalculator: MoveCalculator, private gameState: GameState) {}

    /**
     * @param board
     * @param turn true if it is white's turn. Note that turn flips after a move is executed.
     * So if white just played a move, check if the game is over for black.
     */
    checkGameOver(board: string[]): boolean {

        const gameOver = !this.hasLegalMove(board)
        console.log("game over", gameOver)
        if (!gameOver) return false


        const isKingInCheck = this.moveCalculator.isKingInCheck(board, this.gameState.getTurn())
        
        if (isKingInCheck) {
            const loser = this.gameState.getTurn() ? 'white' : 'black'
            console.log(`${loser} lost.`)
        } else {
            console.log('stalemate')
        }

        return true
    }

    private hasLegalMove(board: string[]) {
        return board.flatMap((_, i) => this.moveCalculator.legalMoves(i))
                    .some(() => true)
    }
}