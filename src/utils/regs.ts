
/**
 * Holds common patterns for moves. Makes it easier to create pieces and their actions.
 */
export const pathPatterns = {

    /**
     * A leaper is a chess piece that moves directly to a square a fixed distance away.
     * Cannot be blocked. 
     */
    leaper: /^([A-Z][a-z ]|[a-z][A-Z ])$/,

    /**
     * A ranger is a piece that moves an unlimited distance in one direction,
     * provided that there are no obstacles. If the obstacle is a friendly piece,
     * it blocks further movement; if the obstacle is an enemy piece, it may be captured.
     */
    ranger: /^([A-Z]\W*[a-z]?|[a-z]\W*[A-Z]?)$/,

    /**
     * Block move if square is occupied.
     */
    unoccupied:  /^.\W$/,

    /**
     * Only allow a move that captures an enemy
     */
    enemy: /^([A-Z][a-z]|[a-z][A-Z])$/,

}


/**
 * Cover is similar to paths, but differ slightly.
 * Pawns covers the squares diagonally infront, but they may not be allowed to move there.
 * The distinction is important, because some moves require a check of what the enemy covers.
 * An example of this is castle.
*/
export const coverPatterns = {

    /**
     * Leapers cover squares even though a friend occupies it.
    */
   leaper: /^([A-Z][a-z]|[a-z][A-Z])$/,
   
   /**
    * Rangers cover squares even though a friend occupies it.
   */
  ranger: /^([A-Z]\W*[a-z]|[a-z]\W*[A-Z])$/,
  
  /**
   * Some moves do not count as cover. Examples are pawn forward moves
   * and other special moves.
  */
 never: /\$/,
 
}

export type PathPatterns = typeof pathPatterns
export type CoverPatterns = typeof coverPatterns