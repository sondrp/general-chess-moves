import { Moveset } from "../../types/types";

const friends = /[A-Z][A-Z]|[a-z][a-z]/;

const wazir: Moveset[] = [
    {
        directions: ['E', 'S', 'W', 'N'],
        stop: friends
    }
]

const ferz: Moveset[] = [
    {
        directions: ['NE', 'SE', 'SW', 'NW'],
        stop: friends
    }
]

const dabbaba: Moveset[] = [
    {
        directions: ['EE', 'SS', 'WW', 'NN'],
        stop: friends
    }
]

const alfil: Moveset[] = [
    {
        directions: ['NNEE', 'SSEE', 'SSWW', 'NNWW'],
        stop: friends
    }
]

const threeleaper: Moveset[] = [
    {
        directions: ['EEE', 'SSS', 'WWW', 'NNN'],
        stop: friends
    }
]

const camel: Moveset[] = [
    {
        directions: ['NNNE', 'EEEN', 'SSSE', 'SSSW', 'WWWS', 'WWWN', 'NNNW'],
        stop: friends
    }
]


export const fairyMovesetMap: Record<string, Moveset[]> = {
    'R': wazir,
    'r': wazir,
    'N': ferz,
    'n': ferz,
    'B': dabbaba,
    'b': dabbaba,
    'Q': alfil,
    'q': alfil,
    'k': threeleaper,
    'K': threeleaper,
    'P': camel,
    'p': camel,
}