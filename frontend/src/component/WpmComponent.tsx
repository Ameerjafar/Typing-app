import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { correctedAtom, inCorrectCharacterAtom, textAtom } from "../store/textAtom";
import { timeAtom } from "../store/TimeAtom";
import { paragraph } from "../store/paragraph";
const WpmComponent = () => {
  const textLength = useRecoilValue(correctedAtom);
  const time = useRecoilValue(timeAtom);
  const [wpm, setWpm] = useState<string>("0");
  const para = useRecoilValue(paragraph);
  const text = useRecoilValue(textAtom);
  const inCorrectCharacter  = useRecoilValue(inCorrectCharacterAtom)
  const [ accuracy, setAccuracy ] = useState<number>(0);
  let correctedCharacters = 0;
  useEffect(() => {
    for(let i = 0; i < text.length; i++) {
      if(para[i] === text[i]) {
        correctedCharacters++;
      }
    } 
    console.log(inCorrectCharacter)
    setAccuracy(textLength / textLength * 100)
    const min = time / 60;
    const word = Math.round((correctedCharacters / 5) / min).toFixed(2);
  
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
