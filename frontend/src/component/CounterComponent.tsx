import { paragraphActive } from "../store/paragraph";

import { counterAtom, timeAtom } from "../store/TimeAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { textAtom } from "../store/textAtom";
const CounterComponent = () => {
     const  isActive = useRecoilValue(paragraphActive)
     const [ counter,  setCounter ] = useRecoilState(counterAtom)
     const navigate = useNavigate();
     const setText = useSetRecoilState(textAtom);
     const [ time, setTime ] = useRecoilState(timeAtom);
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
        <div className = 'text-blue-500 font-mono'>
            { counter }
        </div>
    )
}

export default CounterComponent;