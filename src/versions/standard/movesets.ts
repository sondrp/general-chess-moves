import { Mb, Moveset } from "../../types/classes";
import { enemies, notEnemies, occupied } from "../../utils/regs";


const rook = [
  new Mb().directions(['E', 'S', 'W', 'N']).stopAfter(enemies).build(),
];

const knight = [
  new Mb()
    .directions(['NNE', 'EEN', 'EES', 'SSE', 'SSW', 'WWS', 'WWN', 'NNW'])
    .build(),
];

const bishop = [
  new Mb().directions(['NE', 'SE', 'SW', 'NW']).stopAfter(enemies).build(),
];

const queen = [
  new Mb()
    .directions(['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'])
    .stopAfter(enemies)
    .build(),
];

const whiteKing = [
  new Mb().directions(['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']).build(),
  new Mb()
    .directions(['EE'])
    .boardCondition(/I  R$/)
    .replacement(' RK ')
    .tag('K')
    .build(),
  new Mb()
    .directions(['WW'])
    .boardCondition(/R   I(...)$/)
    .replacement('  KR $1')
    .tag('Q')
    .build(),
];

const blackKing = [
  new Mb().directions(['NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']).build(),
  new Mb()
    .directions(['EE'])
    .boardCondition(/^(....)I  r/)
    .replacement('$1 rk ')
    .tag('k')
    .build(),
  new Mb()
    .directions(['WW'])
    .boardCondition(/^r   I/)
    .replacement('  kr ')
    .tag('q')
    .build(),
];

const whitePawn = [
  new Mb().directions(['NE', 'NW']).stopBefore(notEnemies).tag('P').build(),
  new Mb().directions(['N']).stopBefore(occupied).tag('P').build(),
  new Mb()
    .directions(['NN'])
    .stopBefore(occupied)
    .boardCondition(/ .{7}I.{8,15}$/)
    .tag('whitePawnDoubleForward')
    .build(),
  new Mb()
    .directions(['NE'])
    .stopBefore(occupied)
    .boardCondition(/ (.{6})Ip(.{32,38})$/)
    .replacement('P$1  $2')
    .tag('enPassant')
    .build(),
  new Mb()
    .directions(['NW'])
    .stopBefore(occupied)
    .boardCondition(/ (.{7})pI(.{32,38})$/)
    .replacement('P$1  $2')
    .tag('enPassant')
    .build(),
];

const blackPawn = [
  new Mb().directions(['SE', 'SW']).stopBefore(notEnemies).tag('p').build(),
  new Mb().directions(['S']).stopBefore(occupied).tag('p').build(),
  new Mb()
    .directions(['SS'])
    .stopBefore(occupied)
    .boardCondition(/^.{8,15}I.{7} /)
    .tag('blackPawnDoubleForward')
    .build(),
  new Mb()
    .directions(['SE'])
    .stopBefore(occupied)
    .boardCondition(/^(.{32,38})IP(.{7}) /)
    .replacement('$1  $2p')
    .tag('enPassant')
    .build(),
  new Mb()
    .directions(['SW'])
    .stopBefore(occupied)
    .boardCondition(/^(.{32,38})PI(.{6}) /)
    .replacement('$1  $2p')
    .tag('enPassant')
    .build(),
];

export const movesetMap: Record<string, Moveset[]> = {
  r: rook,
  R: rook,
  n: knight,
  N: knight,
  b: bishop,
  B: bishop,
  q: queen,
  Q: queen,
  k: blackKing,
  K: whiteKing,
  P: whitePawn,
  p: blackPawn,
};
