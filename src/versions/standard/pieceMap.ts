import { Piece } from "../../lib/Piece";
import { PieceBuilder } from "../../lib/PieceBuilder";
import { PieceDirector } from "../../lib/PieceDirector";

const pb = new PieceBuilder()
const pd = new PieceDirector()

export const standardPieceMap: Record<string, Piece> = {
  r: pd.rook(pb).buildPiece(),
  R: pd.rook(pb).buildPiece(),
  n: pd.knight(pb).buildPiece(),
  N: pd.knight(pb).buildPiece(),
  b: pd.bishop(pb).buildPiece(),
  B: pd.bishop(pb).buildPiece(),
  q: pd.queen(pb).buildPiece(),
  Q: pd.queen(pb).buildPiece(),
  K: pd.wKing(pb).buildPiece(),
  k: pd.bKing(pb).buildPiece(),
  P: pd.wPawn(pb).buildPiece(),
  p: pd.bPawn(pb).buildPiece(),
};
