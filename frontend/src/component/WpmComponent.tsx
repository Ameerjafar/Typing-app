import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { textAtom } from "../store/textAtom";
import { timeAtom } from "../store/TimeAtom";
import { paragraph } from "../store/paragraph";
const WpmComponent = () => {
  const text = useRecoilValue(textAtom);
  const words = useRecoilValue(paragraph);
  const time = useRecoilValue(timeAtom);
  const [wpm, setWpm] = useState<string>("0");
  const [ correctedCharacters, setCorrectedCharacter ] = useState<number>(0);
  const [ accuracy, setAccuracy ] = useState<string>("0");
  useEffect(() => {
      const characters = words
        .map((word) => {
          return [...word.split(""), " "];
        })
        .flat();
      const correctCount = text.reduce((count, char, index) => {
        return char === characters[index] ? count + 1 : count;
    }, 0);
    setCorrectedCharacter(correctCount);
    console.log(correctedCharacters);
    const min = time / 60;
    console.log("this is the total character", text.length);
    console.log("this is the corrected characters", correctedCharacters);
    console.log(((correctedCharacters - text.length) / text.length) * 100);
    const word = Math.round((correctedCharacters / 5) / min).toFixed(2);
    setAccuracy(((correctedCharacters / text.length) * 100).toFixed(2));
    setWpm(word);
  }, [correctedCharacters ]);
  return (
    <div className = 'font-mono text-3xl text-[#333333]'>
      <div>{ wpm } wpm</div>
      <div className = 'mt-3'>{ accuracy } Accuracy</div>
      <button className = 'w-36 h-20 mt-4 border-2 text-white'>Restart</button>
    </div>
  )

};

export default WpmComponent;
