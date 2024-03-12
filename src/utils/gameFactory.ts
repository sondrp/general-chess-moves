import { Moveset } from "../types/classes";
import { Move } from "../types/types";
import { isPieceTurnFairy, getBoardFairy, executeFairyMove, checkGameFairy } from "../versions/fairy/fairyGame";
import { checkHistoryFairy, changeHistoryFariy } from "../versions/fairy/fairyHistory";
import { fairyMovesetMap } from "../versions/fairy/fairyMovesets";
import { isPieceTurn, getBoardAsArray, executeMove, checkGame } from "../versions/standard/game";
import { checkHistory, changeHistory } from "../versions/standard/history";
import { movesetMap } from "../versions/standard/movesets";

type Version = {
    movesetMap: Record<string, Moveset[]>;
    isPieceTurn: (piece: string) => boolean;
    getBoard: () => string[];
    executeMove: (move: Move) => string[];
    checkGame: (movesetMap: Record<string, Moveset[]>, move: Move) => boolean;
    checkHistory: (move: Move) => boolean;
    changeHistory: (move: Move) => void;
  };
  
  const standardVersion: Version = {
    movesetMap,
    isPieceTurn,
    getBoard: getBoardAsArray,
    executeMove,
    checkGame,
    checkHistory,
    changeHistory,
  };
  
  const fairyVersion: Version = {
    movesetMap: fairyMovesetMap,
    isPieceTurn: isPieceTurnFairy,
    getBoard: getBoardFairy,
    executeMove: executeFairyMove,
    checkGame: checkGameFairy,
    checkHistory: checkHistoryFairy,
    changeHistory: changeHistoryFariy,
  };

const currentVersions = ['standard', 'fairy']
  
  const versionMap: Record<string, Version> = {
    standard: standardVersion,
    fairy: fairyVersion,
  };
  

export function createGameObjects(version: string): Version {
    if (!currentVersions.includes(version)) throw Error('version does not exist')
    return versionMap[version]
}