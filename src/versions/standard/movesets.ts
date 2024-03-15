import { Moveset, MovesetDirector } from "../../types/Moveset";

const md = new MovesetDirector()

export const standardMovesetMap: Record<string, Moveset[]> = {
  r: md.rook(),
  R: md.rook(),
  n: md.knight(),
  N: md.knight(),
  b: md.bishop(),
  B: md.bishop(),
  q: md.queen(),
  Q: md.queen(),
  k: md.blackKing(),
  K: md.whiteKing(),
  P: md.whitePawn(),
  p: md.blackPawn(),
};
