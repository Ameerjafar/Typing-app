import { useState, useEffect, createRef } from "react";
import CursorBlinker from "../ui/CursorBlinker";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { paragraphActive, paragraphFocus } from "../store/paragraph";
import { textAtom, currentWordIndex, wordAtom , currentInd, isMultiPlayer} from "../store/textAtom";
const Test = () => {
  const words = useRecoilValue(wordAtom);
  const [focus, setFocus] = useRecoilState(paragraphFocus);
  const [text, setText] = useRecoilState(textAtom);
  const [currentIndex, setCurrentIndex] = useRecoilState(currentInd);
  const [wordCharacter, setWordCharacter] = useState<string[]>();
  const [currentWordInd, setCurrentWordIndex] =
    useRecoilState<number>(currentWordIndex);
  const setParagraphActive = useSetRecoilState(paragraphActive);
  const emptySpans = () => {
    return Array(words.length)
      .fill(0)
      .map(() => createRef<HTMLSpanElement>());
  };
  const [wordRef, setWordRef] = useState(emptySpans);
  const keyHandler = (event) => {
    setParagraphActive(true);
    const { key } = event;
    console.log(key);
    if (key === " ") {
      event.preventDefault();
      setText((prev) => [...prev, " "]);
      setCurrentIndex((prev) => prev + 1);
      if (wordCharacter![currentIndex] === " ") {
        setCurrentWordIndex((prev) => prev + 1);
      }
    } else if (/^[a-zA-Z.,]$/.test(key)) {
      setText((prev) => [...prev, key]);
      setCurrentIndex((prev) => prev + 1);
    } else if (key === "Backspace") {
      if (text[text.length - 1] === " ") {
        setCurrentWordIndex((prev) => prev - 1);
      }
      if (event.ctrlKey) {
        console.log("control and backspace is calling");
        let pointer = text.length - 1;
        let dupText = text;
        while (pointer >= 0) {
          if (dupText[pointer] !== " ") {

            dupText = dupText.slice(0, text.length - 1);
          } else {
            break;
          }
          pointer--;
        }
        setText(dupText);
      } else {
        setText(text.slice(0, text.length - 1));
        setCurrentIndex((prev) => prev - 1);
      }
    }
  };
  useEffect(() => {
    if (
      wordRef[currentWordInd].current!.offsetLeft >
      wordRef[currentWordInd + 1].current!.offsetLeft
    ) {
      wordRef[currentWordInd].current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentWordInd]);
  
  // useEffect(() => {
  //   if (text.length !== 0) {
  //     console.log("this is the word length", words[currentWordInd - 1].length);
  //     console.log(
  //       "this is typedCharacter from the word",
  //       typedCharacterFromWord
  //     );
  //     let skipLength =
  //       words[currentWordInd - 1].length - typedCharacterFromWord;
  //     console.log("this is the skiplength", skipLength);
  //     while (skipLength !== 0) {
  //       setText((prev) => [...prev, "$"]);
  //       skipLength--;
  //     }
  //     setCurrentIndex(
  //       (prev) =>
  //         prev + (words[currentWordInd].length - typedCharacterFromWord)
  //     );
  //     setTypedCharacterFromWord(0)
  //   }
  // }, [currentWordInd]);
  useEffect(() => {
    const characters = words
      .map((word) => {
        return [...word.split(""), " "];
      })
      .flat();
    setWordCharacter(characters);
  }, [words]);
  return (
    <div>
      <div>
        {focus && text.length === 0  && (
          <div className="absolute mt-4">
            <CursorBlinker />
          </div>
        )}
        <div className="absolute">
          <div className="tracking-wide text-left leading-loose max-h-52 mr-10">
            {text.map((character, ind) => {
              const i = currentIndex - 1 === ind;
              const correctCharacter = character === wordCharacter![ind];
              return (
                <span key={ind}>
                  {correctCharacter ? (
                    <span className="text-white" key={ind}>
                      {character}
                    </span>
                  ) : (
                    <span
                      className={`${
                        wordCharacter![ind] === " "
                          ? "bg-red-500"
                          : "text-red-500"
                      }`}
                    >
                      {wordCharacter![ind]}
                    </span>
                  )}
                  {i && <CursorBlinker />}
                </span>
              );
            })}
          </div>
        </div>
        <div
          onKeyDown={ keyHandler }
          className="leading-loose text-left h-52 mr-10 tracking-wide outline-none"
          tabIndex={0}
          onBlur={() => setFocus(false)}
          onFocus={() => {
            setFocus(true);
          }}
        >
          {words.map((word, ind) => {
            return (
                <span ref={wordRef[ind]} key={ind}>
                  { word + " " }
                </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Test;