import { atom } from 'recoil';

export const timeAtom = atom<number>({
    key: 'time',
    default: 15
})

export const counterAtom = atom<number>({
    key: "counter",
    default: 0
})