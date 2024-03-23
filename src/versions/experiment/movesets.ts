import { Moveset, MovesetBuilder, MovesetDirector } from "../../types/Moveset";
import { never } from "../../utils/regs";

const md = new MovesetDirector()
const mb = new MovesetBuilder()

const starMove: Moveset[] = [
    mb.directions(['N', 'NN(E)', 'NN(W)']).stopBefore(never).stopAfter(never).build()
] 

export const testMovesetMap: Record<string, Moveset[]> = {
    'R': starMove
}