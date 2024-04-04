import { MoveCalculator } from "../../lib/MoveCalculator";


export class StandardGameOverChecker {

    constructor(private moveCalculator: MoveCalculator) {}

    /**
     * @param board
     * @param turn true if white played the last move. Now check if they won or stalemated.
     */
    gameOver(board: string[], turn: boolean): boolean {

        board.filter((_, index) => board[index] === ' ') // remove empty squares 

        return true
    }

}