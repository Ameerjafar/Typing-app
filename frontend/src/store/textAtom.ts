import { atom } from 'recoil'


export const textAtom = atom<string[]>({
    key: "textAtom",
    default: []
})


export const correctedAtom = atom<number>({
    key: "charactersCountAtom",
    default: 0
})