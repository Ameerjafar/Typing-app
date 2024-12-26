
import { useRecoilState, useSetRecoilState } from "recoil";
import { counterAtom, timeAtom } from "../store/TimeAtom";
import { paragraphActive, paragraphFocus } from "../store/paragraph";
import { textAtom } from "../store/textAtom"
const TimerComponent = () => {
    const [ time, setTime ] = useRecoilState(timeAtom); 
    const setText = useSetRecoilState(textAtom);
    const setIsActive = useSetRecoilState(paragraphActive)
    const setCounter = useSetRecoilState(counterAtom);
    const times = [15, 30, 60];
    const setParagraphFocus = useSetRecoilState(paragraphFocus);
    console.log("Time", time);
    return (
        <div className = ''>
            <div className = 'flex justify-center mr-36 space-x-10 mt-10 text-white rounded-md'>
            {
                        times.map((t, ind) => {
                        return (
                            <div className = ''>
                        <button className = {`${time === t ?"text-blue-500":"text-white"} hover:text-gray-400`} onClick = { () => {
                            setTime(t);
                            setIsActive(false);
                            setCounter(0);
                            setText([])
                            setParagraphFocus(false);
                        } } key = { ind }>{ t }</button>
                            </div>
                        )
                    })
            }
            </div>
        </div>
    )
}

export default TimerComponent;