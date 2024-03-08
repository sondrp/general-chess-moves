import { Moveset } from './movesets';

export const isInBounds = (index: number) => {
  if (index < 0 || 127 < index) return false;
  const x = index % 16;
  return x < 8;
};

const directionMap = {
  E: 1,
  S: 16,
  W: -1,
  N: -16,
} as const;

/* 
  Combine a direction string into offset number, following the map above. Example:
  N     -> -16
  SSW   ->  31
*/
export const parseDirection = (direction: string): number => {
  return direction
    .split('')
    .reduce(
      (accumulator: number, value: string) =>
        accumulator + (directionMap[value as keyof typeof directionMap] || 0),
      0
    );
};

export function moveCalculator(
  board: string[],
  startSquare: number,
  movesets: Moveset[]
) {
  const moves: number[] = [];
  const boardstring = board.join('');
  const boardstringBefore = boardstring.substring(0, startSquare);
  const boardstringAfter = boardstring.substring(startSquare + 1);

  movesets.forEach((moveset) => {
    const offsets = moveset.directions.map(parseDirection);
    const { stop, addBreak, boardBefore, boardAfter } = moveset.condition;

    offsets.forEach((offset) => {
      let square = startSquare + offset;

      while (isInBounds(square)) {
        let moveDescription = board[startSquare] + board[square];

        if (stop.test(moveDescription)) break;

        if (boardBefore && !boardBefore.test(boardstringBefore)) break;
        if (boardAfter && !boardAfter.test(boardstringAfter)) break;

        moves.push(square);
        square += offset;

        if (addBreak.test(moveDescription)) break;
      }
    });
  });

  return moves;
}