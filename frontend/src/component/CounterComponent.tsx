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
        console.log(isActive)
        if (isActive) {
            const timeInterval = setInterval(() => {
                setCounter((prev) => {
                    if (prev - 1 === 0) {
                        clearInterval(timeInterval); 
                        navigate('/result')
                        setText([])
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timeInterval);
        } 
        else {
            setTime(15);
        }
    }, [ isActive ]);
    return (
        <>
          {counter ? (
            <div className="text-blue-500 font-mono">
              {counter}
            </div>
          ) : (
            <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full"></div>
          )}
        </>
      );
}

export default CounterComponent;