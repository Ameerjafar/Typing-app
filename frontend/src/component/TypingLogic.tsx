import { useEffect, useState } from "react";
import axios from "axios";
import CursorBlinker from "../ui/CursorBlinker";
import { useRecoilState, useSetRecoilState } from "recoil";
import { inCorrectedAtom, textAtom } from "../store/textAtom";
import { paragraphActive, paragraphFocus } from "../store/paragraph";
import CounterComponent from "./CounterComponent";
import { randomWord } from "./wordList";
const TypingLogic = () => {
  const [text, setText] = useRecoilState(textAtom);
  const [words, setWords] = useState<string[]>(randomWord);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [focus, setFocus] = useRecoilState(paragraphFocus);
  const setIsActive = useSetRecoilState(paragraphActive);
  const setInCorrectCharacter = useSetRecoilState(inCorrectedAtom);
  const [ correct, setCorrect ] = useState<boolean[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);

  useEffect(() => {
    const fetchParagraph = async () => {
      console.log(import.meta.env.VITE_API_PATH);
      const response = await axios.get(`${import.meta.env.VITE_API_PATH}`);
      setParagraph(response.data.paragraph);
      console.log(response.data.paragraph);
    };
    fetchParagraph();
  }, []);
  const handleKeyDown = (event) => {
    const { key } = event;
    console.log(key);
    setIsActive(true);
    if (key === " ") {
      setText([...text, " "]);
    } else if (key === "Backspace") {
      setText(text.slice(0, text.length - 1));
    } else if (/^[a-zA-Z.,]$/.test(key)) {
      setText([...text, key]);
    }
    setCurrentIndex(text.length);
    if (currentIndex + 1 === words[currentWordIndex].length) {
      setCurrentWordIndex((prev) => prev + 1);
    }
  };
  useEffect(() => {
    for(let i = 0; i < text.length; i++) {
      if(word[currentWordIndex] === text[i]) {
        
      }
    }
  }, [ text, words ])
  return (
    <div>
      <CounterComponent />
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocus(true)}
      >
        {!focus && (
          <div className="absolute z-0 flex justify-center w-full h-full items-center text-white">
            click here to focus on the content
          </div>
        )}
        {focus && text.length === 0 && (
          <div className="absolute z-0 mt-3">
            <CursorBlinker />
          </div>
        )}
        <div
          className={`leading-loose ${
            focus ? "blur-none" : "blur-sm"
          } overflow-hidden h-52`}
        >
          {words.map((word, ind) => {
            return <span key={ind}>{word + " "}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default TypingLogic;
