
/* Split the beam moves from the normal moves */

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

const directionRegex = /^([ESWN]*)\(?([ESWN]*)\)?(\d)?$/;

export class MoveQueue {
  private index = 0; // current index in the queue
  private queue: number[] = []; // all the squares (in order) that can be moved to
  
  constructor(startSquare: number, direction: string) {
    /* Let's assume only one star match max at first. */
    
    const match = directionRegex.exec(direction);
    
    if (!match) throw Error('Illegal direction given to MoveQueue');
    const [_, base, beam, quantity] = match;
    
    let offset = base ? base : beam;
    let square = startSquare;
    
    let count = 0;
    const maxCount = quantity ? parseInt(quantity) : 100;
    
    while (isInBounds(square, offset) && count < maxCount) {
      count++;
      square += parseDirection(offset);
      this.queue.push(square);
      
      offset = beam;
      if (!offset) break
    }
  }
  
  hasNext(): boolean {
    return this.index < this.queue.length;
  }

  next(): number {
    return this.queue[this.index++];
  }
}
