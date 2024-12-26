
import { RotateCcw } from 'lucide-react'
import { useSetRecoilState } from 'recoil'
import { textAtom } from '../store/textAtom'
import { counterAtom  } from '../store/TimeAtom'
import { paragraphFocus, paragraphActive } from '../store/paragraph'
const Reset = () => {
    const setText = useSetRecoilState(textAtom)
    const isActive = useSetRecoilState(paragraphActive);
    const setCounter = useSetRecoilState(counterAtom);
    const setParagraphFocus = useSetRecoilState(paragraphFocus)
    const resetHandler = () => {
        setText([]);
        setCounter(0);
        isActive(false);
        setParagraphFocus(false);   
    }
    return (
        <button onClick = { resetHandler } className = 'flex justify-center text-[#333333] hover:text-white'>
            <RotateCcw />
        </button >
    )
}   

export default Reset;