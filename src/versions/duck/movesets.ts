/* 
   How to describe duck movement? It can reach any square. 
   So not really possible to use directions like normal, except to write out all directions in a 64 square radius?
   
   The duck introduces many new problems actually:
   - It must move to every square, not something that can be elegantly expressed currently
   - It must change the stopBefore rule of every piece (cannot capture the duck)
   - To use the current direction system, it must be able to exclude squares (must reach every empty square on the board)

   Solutions:
    - Reach every square -

   This can be done by descripting the whole board through directions. It is however really annoying, because reaching corner to corner is not very general
   (example: reaching top row from bottom left corner needs directions N, NNNNNNNE NNNNNNNEE NNNNNNNEEE, ... and that is just one corner to one row)

   Not beautiful to say the least. Would be interesting if we could compound directions. Like (NN, E) to mean two north and whole row east.
   Unclear how to do that currently.  


    - Extend standard moveset -

   Could add some function on the moveset itself called extend. Although it is slightly terrible to do so. 
   Another possibility is to make the Moveset into an array of movesets. I like this solution better, because it makes more sense 
   for the rest of the application too.

   Think it is better to just do it programatically. Although it might be a disaster..

*/

import { Moveset, MovesetBuilder, MovesetDirector } from '../../types/Moveset';
import { enemies, never, occupied } from '../../utils/regs';

const md = new MovesetDirector();

const duck = [
  new MovesetBuilder()
    .directions(['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'])
    .exclude(occupied)
    .stopAfter(never)
    .build(),
];

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
  d: duck,
};
