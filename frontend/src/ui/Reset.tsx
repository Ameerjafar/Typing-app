
import { RotateCcw } from 'lucide-react'
import { useSetRecoilState } from 'recoil'
import { textAtom } from '../store/textAtom'
const Reset = () => {
    const setText = useSetRecoilState(textAtom)
    const resetHandler = () => {
        setText([])
    }
    return (
        <button onClick = { resetHandler } className = 'flex justify-center text-[#333333] hover:text-white'>
            <RotateCcw />
        </button >
    )
}   

export default Reset;