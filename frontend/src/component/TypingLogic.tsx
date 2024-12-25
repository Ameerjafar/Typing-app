import { useEffect, useState } from "react";
import axios from "axios";
import CursorBlinker from "../ui/CursorBlinker";
import { useRecoilState, useSetRecoilState } from "recoil";
import { textAtom, correctedAtom } from "../store/textAtom";
import { paragraphActive } from "../store/paragraphActive";
const TypingLogic = () => {
  const [text, setText] = useRecoilState(textAtom);
  const setCorrectCharacters  = useSetRecoilState(correctedAtom);
  const [paragraph, setParagraph] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [ focus, setFocus ] = useState<boolean>();
  const  setIsActive  = useSetRecoilState(paragraphActive);
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
    setIsActive(true);
    if (key === " ") {
      setText([...text, " "]);
    } else if (key === "Backspace") {
      setText(text.slice(0, text.length - 1));
    } else if (/^[a-zA-Z.,]$/.test(key)) {
      setText([...text, key]);
    }
    setCurrentIndex(text.length);
    console.log(text);
  };
  
  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} onFocus={() => setFocus(true)}>
      { !focus && <div className = 'absolute z-0 flex justify-center w-full h-full items-center text-white'>click here to focus on the content</div>}
      <div className="absolute z-0 leading-loose">
        {text.map((character, ind) => {
          const inCorrect = character !== paragraph[ind];
          const i = currentIndex === ind;
          console.log(currentIndex); 
          return (
            <span key={ind}>
              {inCorrect ? (
                <span
                  key={ind}
                  className={`${
                    paragraph[ind] === " " ? "bg-red-500" : "text-red-500"
                  }`}
                >
                  {paragraph[ind]}
                </span>
              ) : (
                <span key={ind} className="text-white">
                  {character}
                </span>
              )}
              {i && <CursorBlinker />}
            </span>
          );
        })}
      </div>
      <div className={`leading-loose ${focus ? "blur-none": "blur-sm"}`}>{paragraph}</div>

    </div>
  )
};

export default TypingLogic;
