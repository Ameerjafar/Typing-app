import { atom } from 'recoil';

export const timeAtom = atom<number>({
    key: 'time',
    default: 15
})