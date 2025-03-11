import { atom } from 'recoil'
import { wordGenerator } from '../component/wordList'

export const currentInd = atom<number>({
    key: "currentInd",
    default: 0
})

export const textAtom = atom<string[]>({
    key: "textAtom",
    default: []
})


export const currentWordIndex = atom<number>({
    key: "currentWordIndex",
    default: 0
})

export const wordAtom = atom<string[]>({
    key: "wordAtom",
    default: wordGenerator()
})

export const isMultiPlayer = atom<boolean>({
    key: "isMultiPlayer",
    default: false
})