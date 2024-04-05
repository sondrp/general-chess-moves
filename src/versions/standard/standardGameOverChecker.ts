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

        const gameOver = this.hasLegalMove(board)
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
        return board.map((_, i) => i)  // use index and not piece
        .filter(square => board[square] !== ' ') // remove empty squares
        .filter(piece => white.test(board[piece]) ===  this.gameState.getTurn()) // include active pieces
        .some(piece => this.moveCalculator.legalMoves(piece))
    }
}