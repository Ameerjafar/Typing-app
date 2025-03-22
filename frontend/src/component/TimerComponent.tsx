import { useRecoilState, useSetRecoilState } from "recoil";
import { counterAtom, timeAtom } from "../store/TimeAtom";
import { paragraphActive, paragraphFocus } from "../store/paragraph";
import { textAtom } from "../store/textAtom";
import { Timer } from "lucide-react";
const TimerComponent = () => {
  const [time, setTime] = useRecoilState(timeAtom);
  const setText = useSetRecoilState(textAtom);
  const setIsActive = useSetRecoilState(paragraphActive);
  const setCounter = useSetRecoilState(counterAtom);
  const times = [15, 30, 60];
  const setParagraphFocus = useSetRecoilState(paragraphFocus);
  // const setInCorrectedCharacter = useSetRecoilState(inCorrectedAtom);
  console.log("Time", time);
  return (
    <div>
      <div>
        <div className="flex justify-center mr-46 space-x-10 text-white rounded-md mb-2">
          <div className="flex bg-[#1e1e1e] rounded-full text-center p-3">
            <div className = 'text-white text-xl'><Timer /></div>
            {times.map((t, ind) => {
              return (
                <div className="w-10" key={ind}>
                  <button
                    className={`${
                      time === t ? "text-blue-500" : "text-white"
                    } hover:text-gray-400`}
                    onClick={() => {
                      setTime(t);
                      setIsActive(false);
                      setCounter(time);
                      setText([]);
                      setParagraphFocus(false);
                      // setInCorrectedCharacter(0);
                    }}
                    key={ind}
                  >
                    {t}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
