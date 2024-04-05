import { notEnemies, occupied } from "../utils/regs"
import { PieceBuilder } from "./PieceBuilder"

export class PieceDirector {

    rook(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('E*', 'S*', 'W*', 'N*').buildAction()
    }
  
    knight(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW').buildAction()
    }
  
    bishop(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE*', 'SE*', 'SW*', 'NW*').buildAction()
    }
  
    queen(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE*', 'E*',  'SE*', 'S*', 'SW*', 'W*', 'NW*', 'N*').buildAction()
    }
  
    wKing(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N').id('wk').buildAction()
                         .directions('EE').boardCondition(/I  R$/).replacement(' RK ').isCover(false).id('K').buildAction()
                         .directions('WW').boardCondition(/R   I(...)$/).replacement('  KR $1').isCover(false).id('Q').buildAction()
    }
  
    bKing(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N').id('bk').buildAction()
                         .directions('EE').boardCondition(/^(....)I  r/).replacement('$1 rk ').isCover(false).id('k').buildAction()
                         .directions('WW').boardCondition(/^r   I/).replacement('  kr ').isCover(false).id('q').buildAction()
    }
  
    wPawn(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE', 'NW').stopBefore(notEnemies).id('P').buildAction()
                         .directions('N').stopBefore(occupied).isCover(false).id('P').buildAction()
                         .directions('NN').stopBefore(occupied).isCover(false).boardCondition(/ .{7}I.{8,15}$/).id('wPawnDoubleForward').buildAction()
                         .directions('NE').stopBefore(occupied).isCover(false).boardCondition(/ (.{6})Ip(.{32,38})$/).replacement('P$1  $2').id('enPassant').buildAction()
                         .directions('NW').stopBefore(occupied).isCover(false).boardCondition(/ (.{7})pI(.{32,38})$/).replacement('P$1  $2').id('enPassant').buildAction()
      
    }
  
    bPawn(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('SE', 'SW').stopBefore(notEnemies).id('p').buildAction()
                         .directions('S').stopBefore(occupied).isCover(false).id('p').buildAction()
                         .directions('SS').stopBefore(occupied).isCover(false).boardCondition(/^.{8,15}I.{7} /).id('bPawnDoubleForward').buildAction()
                         .directions('SE').stopBefore(occupied).isCover(false).boardCondition(/^(.{32,38})IP(.{7}) /).replacement('$1  $2p').id('enPassant').buildAction()
                         .directions('NW').stopBefore(occupied).isCover(false).boardCondition(/^(.{32,38})PI(.{6}) /).replacement('$1  $2p').id('enPassant').buildAction()
    }
  }
  