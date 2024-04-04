import { MoveCalculator } from "../../lib/MoveCalculator";
import { GameState, Move } from "../../types/types";

const white = /[A-Z]/;
/* 
    True for white's turn
    When duck is true, they have to move the duck.
*/
const gameState = {
    turn: true,
    duck: false,
    board:'rnbqkbnrpppppppp      d                         PPPPPPPPRNBQKBNR',
    gameActive: true,
  }

export class DuckGameState implements GameState {

    constructor(private moveCalculator: MoveCalculator) {}
    
    executeMove(move: Move): string[] {
        /* Not so simple!
            We stay in whites turn for two execs. First for normal move, then for 
            Duck move.
        */

        if (gameState.duck) {
            gameState.turn = !gameState.turn;
            gameState.duck = false
        } else {
            gameState.duck = true
        }

        gameState.board = move.result;
    
        const board = move.result.split('');
        
        // Promote pawn should it reach the final rank
        const { square, tag } = move;
        if (tag === 'P' && ~~(square / 8) === 0) {
            board[square] = 'Q';
        }
        
        if (tag === 'p' && ~~(square / 8) === 7) {
            board[square] = 'q';
        }
        
        /* NEED TO ALSO CHECK FOR GAME OVER AFTER EXECUTING A MOVE !!! */
        
        return board;
    }
    
    // There are no game specific moves that are illegal in duck chess
    // King can move into check and castle into check
    checkGame(move: Move): boolean {
        return true
    }

    getBoard(): string[] {
        return gameState.board.split('');
    }

    isPieceTurn(piece: string): boolean {
        const whitePiece = white.test(piece)
        const correctColorPlaying = whitePiece === gameState.turn || piece === 'd'
        if (!correctColorPlaying) return false

        console.log('correct player')
        
        /* We know that the current player clicked on a piece. Now to 
        Determine if they should move duck or not.
        */
       
       if (gameState.duck) {
           // then you have to move the duck
           return piece === 'd'
        }

        return piece !== 'd'
    }
    
}