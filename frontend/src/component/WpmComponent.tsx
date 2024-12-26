import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { textAtom } from "../store/textAtom";
import { timeAtom } from "../store/TimeAtom";
import { paragraph } from "../store/paragraph";
const WpmComponent = () => {
  const text = useRecoilValue(textAtom);
  const para = useRecoilValue(paragraph);
  const time = useRecoilValue(timeAtom);
  const [wpm, setWpm] = useState<string>("0");
  const [ accuracy, setAccuracy ] = useState<string>("0");
  let correctCharacters = 0;
  useEffect(() => {
    for(let i = 0; i < text.length; i++) {
      if(text[i] === para[i]) {
        correctCharacters++;
      }
    }
    const min = time / 60;
    console.log("this is the total character", text.length);
    console.log("this is the corrected characters", correctCharacters);
    console.log(((correctCharacters - text.length) / text.length) * 100);
    const word = Math.round((correctCharacters / 5) / min).toFixed(2);
    setAccuracy(Math.abs(((correctCharacters - text.length)/ text.length)  * 100).toFixed(2))
    setWpm(word);
  }, []);
  return (
    <div className = 'font-mono text-3xl text-[#333333]'>
      <div>{ wpm } wpm</div>
      <div className = 'mt-3'>{ accuracy } Accuracy</div>
      <button className = 'w-36 h-20 mt-4 border-2 text-white'>Restart</button>
    </div>
  )

};

export default WpmComponent;
