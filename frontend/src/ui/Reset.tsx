
import { RotateCcw } from 'lucide-react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { textAtom, currentWordIndex } from '../store/textAtom'
import { counterAtom, timeAtom  } from '../store/TimeAtom'
import { paragraphFocus, paragraphActive } from '../store/paragraph'
import toast from 'react-hot-toast'
import { updateTestCompleted, updateTestStarted } from '../component/UpdataUserData'
const Reset = () => {
    const [text, setText] = useRecoilState(textAtom)
    const isActive = useSetRecoilState(paragraphActive);
    const [counter, setCounter] = useRecoilState(counterAtom);
    const setParagraphFocus = useSetRecoilState(paragraphFocus)
    const setCurrentWordIndex = useSetRecoilState(currentWordIndex);
    const time = useRecoilValue(timeAtom);
    const resetHandler = async () => {
        setText([]);
        setCounter(0);
        isActive(false);
        setParagraphFocus(false);   
        setCurrentWordIndex(0);
        if(counter === time) {
            const response = updateTestCompleted();
            console.log(response);
            toast.success("Your test has updated successfully");
        }
        else {
            const response = updateTestStarted();
            toast.success("store successfully")
        }
    }
    return (
        <button onClick = { resetHandler } className = 'flex justify-center text-[#333333] hover:text-white'>
            <RotateCcw />
        </button >
    )
}   

export default Reset;