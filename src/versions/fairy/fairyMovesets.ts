import { Mb, Moveset } from "../../types/classes"

const wazir = [
    new Mb().directions(['E', 'S', 'W', 'N']).build()
]

const ferz = [
        new Mb().directions(['NE', 'SE', 'SW', 'NW']).build()
]

const dabbaba = [
        new Mb().directions(['EE', 'SS', 'WW', 'NN']).build()
]

const alfil = [
        new Mb().directions(['NNEE', 'SSEE', 'SSWW', 'NNWW']).build()
]

const threeleaper = [
        new Mb().directions(['EEE', 'SSS', 'WWW', 'NNN']).build()
]

const camel = [
        new Mb().directions(['NNNE', 'EEEN', 'SSSE', 'SSSW', 'WWWS', 'WWWN', 'NNNW']).build()
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