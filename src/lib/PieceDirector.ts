import { PieceBuilder } from "./PieceBuilder"

export class PieceDirector {

    rook(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('E', 'S', 'W', 'N').type('ranger').buildAction()
    }
  
    knight(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW').buildAction()
    }
  
    bishop(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE', 'SE', 'SW', 'NW').type('ranger').buildAction()
    }
  
    queen(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE', 'E',  'SE', 'S', 'SW', 'W', 'NW', 'N').type('ranger').buildAction()
    }
  
    wKing(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N').id('wk').buildAction()
                         .directions('EE').boardCondition(/I  R$/).replacement(' RK ').cover('never').id('K').buildAction()
                         .directions('WW').boardCondition(/R   I(...)$/).replacement('  KR $1').cover('never').id('Q').buildAction()
    }
  
    bKing(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N').id('bk').buildAction()
                         .directions('EE').boardCondition(/^(....)I  r/).replacement('$1 rk ').cover('never').id('k').buildAction()
                         .directions('WW').boardCondition(/^r   I/).replacement('  kr ').cover('never').id('q').buildAction()
    }
  
    wPawn(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('NE', 'NW').path('enemy').id('P').buildAction()
                         .directions('N').path('unoccupied').cover('never').id('P').buildAction()
                         .directions('NN').path('unoccupied').cover('never').boardCondition(/ .{7}I.{8,15}$/).id('wPawnDoubleForward').buildAction()
                         .directions('NE').path('unoccupied').cover('never').boardCondition(/ (.{6})Ip(.{32,38})$/).replacement('P$1  $2').id('enPassant').buildAction()
                         .directions('NW').path('unoccupied').cover('never').boardCondition(/ (.{7})pI(.{32,38})$/).replacement('P$1  $2').id('enPassant').buildAction()
      
    }
  
    bPawn(pieceBuilder: PieceBuilder) {
      return pieceBuilder.directions('SE', 'SW').path('enemy').id('p').buildAction()
                         .directions('S').path('unoccupied').cover('never').id('p').buildAction()
                         .directions('SS').path('unoccupied').cover('never').boardCondition(/^.{8,15}I.{7} /).id('bPawnDoubleForward').buildAction()
                         .directions('SE').path('unoccupied').cover('never').boardCondition(/^(.{32,38})IP(.{7}) /).replacement('$1  $2p').id('enPassant').buildAction()
                         .directions('NW').path('unoccupied').cover('never').boardCondition(/^(.{32,38})PI(.{6}) /).replacement('$1  $2p').id('enPassant').buildAction()
    }
  }
  