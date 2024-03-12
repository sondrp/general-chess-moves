/* If we are given the directions as strings, we can decode them into dx, dy first, then check border crossing. 
   Then return absolute displacement later.
*/

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
    .reduce(
      (sum, d) => (/^[EW]$/.test(d) ? sum + directionMap[d] : sum),
      0
    );
  const dy = direction
    .split('')
    .reduce(
      (sum, d) => (/^[SN]$/.test(d) ? sum + directionMap[d] : sum),
      0
    );
    return [dx, dy]
};

export const isInBounds = (index: number, direction: string) => {
  const x = index % 8
  const y = ~~(index / 8)
  const [dx, dy] = decomposeDirection(direction)

  const newX = x + dx
  const newY = y + dy

  return 0 <= newX && newX < 8 && 0 <= newY && newY < 8  
};

export const parseDirection = (direction: string): number => {
  const [dx, dy] = decomposeDirection(direction)
  return dx + dy * 8
};
