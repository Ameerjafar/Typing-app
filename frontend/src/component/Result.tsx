
import WpmComponent from "./WpmComponent";
import { updateTestCompleted, updateTestInformation } from "./UpdataUserData";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { timeAtom } from "../store/TimeAtom";
const Result = () => {
  const [ wpm, setWpm ] = useState<string>("0");
  const [ accuracy, setAccuracy ] = useState<string>("0"); 
  const time = useRecoilValue(timeAtom);
  const hasEffectRun = useRef(false);
  useEffect(() => {
    if(hasEffectRun.current === true) return;
    updateTestCompleted();
    updateTestInformation(wpm, time, accuracy);
    hasEffectRun.current = true;
  }, [wpm])
  return (
    <div className = 'bg-[#121212] w-full h-screen flex justify-center items-center'>
      <WpmComponent wpm = { wpm } setWpm = { setWpm } accuracy = { accuracy } setAccuracy = { setAccuracy }  />
    </div>
  )
}

export default Result;
