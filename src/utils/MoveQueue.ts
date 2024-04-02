/* Used to check border crossings */
const directionMap: Record<string, number> = {
  E: 1,
  S: 1,
  W: -1,
  N: -1,
};

const decomposeDirection = (direction: string) => {
  const dx = direction
  .split('')
  .reduce((sum, d) => (/^[EW]$/.test(d) ? sum + directionMap[d] : sum), 0);
  const dy = direction
  .split('')
  .reduce((sum, d) => (/^[SN]$/.test(d) ? sum + directionMap[d] : sum), 0);
  return [dx, dy];
};

export const isInBounds = (index: number, direction: string) => {
  const x = index % 8;
  const y = ~~(index / 8);
  const [dx, dy] = decomposeDirection(direction);
  
  const newX = x + dx;
  const newY = y + dy;
  
 return 0 <= newX && newX < 8 && 0 <= newY && newY < 8;
};

export const parseDirection = (direction: string): number => {
  const [dx, dy] = decomposeDirection(direction);
  return dx + dy * 8;
};

const offsetMap: Record<string, number> = {
  E: 1,
  S: 8,
  W: -1,
  N: -8
}

const parseOffset = (offset: string): number => {
  return offset.split('').reduce((sum, d) => sum + offsetMap[d], 0)
}

const parseRepetitions = (repetition: string): number => {
  if (repetition === '*') return 7
  if (repetition === '') return 1
  return parseInt(repetition, 10)
} 


export class MoveQueue {
  private directionRegex = /([ESWN]+)([\d\*]*)/g;
  private index = 0; // current index in the queue
  private queue: number[] = []; // all the squares (in order) that can be moved to
  
  constructor(startSquare: number, direction: string) {
    
    let currentSquare = startSquare   // the starting point for the movement
    
    let match;
    while ((match = this.directionRegex.exec(direction)) !== null) {
 
      const currentDirection = match[1]   // Needed to make sure piece does not cross border (cannot be determined with absolute offset)
      const offset = parseOffset(currentDirection) // absolute offset to find next square
      const repetitions = parseRepetitions(match[2])    // number of moves in this currentDirection
      
      let i = 0
      while (i < repetitions) {
        if (!isInBounds(currentSquare, currentDirection)) return 

        currentSquare += offset
        i++
        this.queue.push(currentSquare)
      }
    }
  }
  
  hasNext(): boolean {
    return this.index < this.queue.length;
  }

  next(): number {
    return this.queue[this.index++];
  }
}
