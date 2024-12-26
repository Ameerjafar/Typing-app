import { useEffect  } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { counterAtom, timeAtom } from "../store/TimeAtom";
import { useNavigate } from "react-router-dom";
import { paragraphActive, paragraphFocus } from "../store/paragraph";
import { textAtom } from "../store/textAtom"
const TimerComponent = () => {
    const navigate = useNavigate();
    const [ time, setTime ] = useRecoilState(timeAtom); 
    const setText = useSetRecoilState(textAtom);
    const times = [15, 30, 60];
    const [ counter,  setCounter ] = useRecoilState(counterAtom)
    const [ isActive, setIsActive ] = useRecoilState(paragraphActive)
    const setParagraphFocus = useSetRecoilState(paragraphFocus);

    useEffect(() => {
        // if (isActive) return;
        console.log(isActive)
        if (isActive) {
            const timeInterval = setInterval(() => {
                setCounter((prev) => {
                    if (prev + 1 === time) {
                        clearInterval(timeInterval); 
                        navigate('/result')
                        setText([])
                    }
                    return prev + 1;
                });
            }, 1000);
            return () => clearInterval(timeInterval);
        } 
        else {
            setTime(15);
        }
    }, [ isActive ]);
    return (
        <div className = ''>
            <div className = 'flex justify-center mr-36 space-x-10 mt-10 text-white bg-black'>
            {
                        times.map((time, ind) => {
                        return (
                            <div className = ''>
                        <button onClick = { () => {
                            setTime(time);
                            setIsActive(false);
                            setCounter(0);
                            setText([])
                            setParagraphFocus(false);
                        } } key = { ind }>{ time }</button>
                            </div>
                        )
                    })
            }
            </div>
            <div className = 'text-white'>{ counter }</div>
        </div>
    )
}

export default TimerComponent;