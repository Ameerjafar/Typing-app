
import { useState, useEffect  } from "react";
import { useRecoilState } from "recoil";
import { timeAtom } from "../store/TimeAtom";
import { useNavigate } from "react-router-dom";
import { paragraphActive } from "../store/paragraphActive";
const TimerComponent = () => {
    const navigate = useNavigate();
    const [ time, setTime ] = useRecoilState(timeAtom); 
    const times = [15, 30, 60];
    const [counter, setCounter ] = useState(0);
    const [ isActive, setIsActive ] = useRecoilState(paragraphActive)
    console.log(time)
    useEffect(() => {
        if (isActive) return;

        const timeInterval = setInterval(() => {
            setCounter((prev) => {
                if (prev + 1 === time) {
                    setIsActive(false);
                    clearInterval(timeInterval); 
                    navigate('/result');
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(timeInterval); 
    }, [ time, isActive ]);
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