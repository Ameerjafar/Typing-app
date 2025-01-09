
import { atom } from "recoil"


// export const paragraph = atom<string[]>({
//     key: "paragraph",
//     default: []
// })
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