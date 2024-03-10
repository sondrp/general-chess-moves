
export function getPieceImage(name: string) {
    let piece = name
    if (/[rnbqkpazc]/g.test(name)) {
        piece = 'b' + piece
    }
    if (/[RNBQKPAZC]/g.test(name)) {
        piece = 'w' + piece.toLowerCase()
    }

    return new URL(`../assets/${piece}.png`, import.meta.url).href;
  }