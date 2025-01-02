
import { RotateCcw } from 'lucide-react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { textAtom, currentWordIndex } from '../store/textAtom'
import { counterAtom  } from '../store/TimeAtom'
import { paragraphFocus, paragraphActive } from '../store/paragraph'
import axios from 'axios'
import toast from 'react-hot-toast'
const Reset = () => {
    const [text, setText] = useRecoilState(textAtom)
    const isActive = useSetRecoilState(paragraphActive);
    const setCounter = useSetRecoilState(counterAtom);
    const setParagraphFocus = useSetRecoilState(paragraphFocus)
    const setCurrentWordIndex = useSetRecoilState(currentWordIndex);
    const resetHandler = async () => {
        const userId = localStorage.getItem("userId");
        setText([]);
        setCounter(0);
        isActive(false);
        setParagraphFocus(false);   
        setCurrentWordIndex(0);
        if(text.length > 0) {
            const response = await axios.put(`${import.meta.env.VITE_API_PATH}/user/testComplete/${userId}`);
            console.log(response);
            toast.success("Your test has updated successfully");
        }
        else {
            const response = await axios.put(`${import.meta.env.VITE_API_PATH}/user/testStarted/${userId}`);
            console.log(response);
        }
    }
    return (
        <button onClick = { resetHandler } className = 'flex justify-center text-[#333333] hover:text-white'>
            <RotateCcw />
        </button >
    )
}   

export default Reset;