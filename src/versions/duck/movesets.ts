

/* How to describe duck movement? It can reach any square. 
   So not really possible to use directions like normal, except to write out all directions in a 64 square radius?
*/

import { Moveset, MovesetBuilder, MovesetDirector } from "../../types/Moveset";
import { enemies, never, occupied } from "../../utils/regs";

const md = new MovesetDirector()

const duckMoveset = [
    new MovesetBuilder().directions(['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']).exclude(occupied).stopAfter(never).build(),
    new MovesetBuilder().directions(['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW']).build()
]

export const duckMovesetMap: Record<string, Moveset[]> = {
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
    d: duckMoveset
  };
  