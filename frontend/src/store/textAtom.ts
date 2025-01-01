import { atom } from 'recoil'


export const textAtom = atom<string[]>({
    key: "textAtom",
    default: []
})


export const currentWordIndex = atom<number>({
    key: "currentWordIndex",
    default: 0
})