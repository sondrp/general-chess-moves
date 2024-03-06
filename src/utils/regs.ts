

const white = /[RNBQKP]/
const black = /[rnbqkp]/

const enemies = /[RNBQKP][rnbqkp]|[rnbqkp][RNBQKP]/
const friends = /[RNBQKP][RNBQKP]|[rnbqkp][rnbqkp]/

const notEnemies = /[RNBQKP][rnbqkp ]|[rnbqkp][RNBQKP ]/
const notFriends = /[RNBQKP][RNBQKP ]|[rnbqkp][rnbqkp ]/

/* 
    For example: "East if not enemies"
    square1 = board[currentSquare]
    square2 = board[currentSquare + 1]

    const match = (square1 + square2).test(notFriends)

*/