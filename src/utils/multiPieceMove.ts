/* 

    Able to complete a multipiece move by replacing the whole board.

*/

import { isInBounds, parseDirection } from './moveCalculation';

type MultiPieceMove = {
  direction: string;
  condition: RegExp;
  replacement: string;
};

const whiteCastleRight: MultiPieceMove = {
  direction: 'EE',
  condition: /I  R(.{8})$/,
  replacement: ' R  $1',
};

const whiteCastleLeft: MultiPieceMove = {
  direction: 'WW',
  condition: /R   I(.{11})$/,
  replacement: '   R $1',
};

const blackCastleLeft = {
    direction: 'WW',
    condition: /^r   I/,
    replacement: '   r '  
}

const blackCastleRight = {
    direction: 'EE',
    condition: /^(.{4})I  r/,
    replacement: '$1 r  '
}

const blackEnPassantLeft = {
    direction: 'SW',
    condition: /^(.{64,70})PI(.{14} )/,
    replacement: '$1  $2'
}

const blackEnPassantRight = {
    direction: 'SE', 
    condition: /^(.{64,70})IP(.{15} )/,
    replacement: '$1  $2'
}

const whiteEnPassantRight = {
    direction: 'NE',
    condition: /( .{14})Ip(.{72,78})$/,
    replacement: '$1  $2'
}

const whiteEnPassantLeft = {
    direction: 'NW',
    condition: /( .{15})pI(.{72,78})$/,
    replacement: '$1  $2'
}

const whiteCastles: MultiPieceMove[] = [
    whiteCastleLeft, 
    whiteCastleRight,
    blackCastleLeft,
    blackCastleRight,
    blackEnPassantLeft,
    blackEnPassantRight,
    whiteEnPassantLeft,
    whiteEnPassantRight,
];

type Move = {
  square: number;
  result: string;
};

export function multiPieceMoveCalculator(b: string[], startSquare: number) {
  const moves: Move[] = [];
  const board = [...b];
  board[startSquare] = 'I'; // Replace this to be able to match it in regex. Otherwise it is not possible to distinguish selected pawns (for example) from other pawns.

  const boardstring = board.join('');

  console.log(boardstring);

  whiteCastles.forEach((moveset) => {
    const { direction, condition, replacement } = moveset;

    const offset = parseDirection(direction);           // 'EE' -> 2 
    const square = startSquare + offset;

    if (!isInBounds(square)) return;
    if (!condition.test(boardstring)) return;

    const result = boardstring.replace(condition, replacement);

    moves.push({ square, result });
  });

  return moves;
}
