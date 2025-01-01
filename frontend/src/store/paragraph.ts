
import { atom } from "recoil"
import { randomWord } from "../component/wordList"

export const paragraph = atom<string[]>({
    key: "paragraph",
    default: randomWord
})
export const paragraphActive = atom<boolean>({
    key: "isActiveAtom",
    default: false
})

export const paragraphFocus = atom<boolean>({
    key: "paragraphFocus",
    default: false
})

export const inCorrect = atom<number>({
    key: "inCorrecCharacterCount",
    default: 0
})