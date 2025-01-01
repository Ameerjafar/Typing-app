import { useState, useEffect, createRef } from "react";
import { randomWord } from "./wordList";
import CursorBlinker from "../ui/CursorBlinker";
import { useRecoilState } from "recoil";
import { paragraphFocus } from "../store/paragraph";
import { textAtom, currentWordIndex } from "../store/textAtom";
const Test = () => {
  const [words, setWords] = useState(randomWord);
  const [focus, setFocus] = useRecoilState(paragraphFocus);
  const [text, setText] = useRecoilState(textAtom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordCharacter, setWordCharacter] = useState<string[]>();
  const [currentWordInd, setCurrentWordIndex] = useRecoilState<number>(currentWordIndex);
  const emptySpans = () => {
    return Array(words.length)
      .fill(0)
      .map(() => createRef<HTMLSpanElement>());
  };
  const [wordRef, setWordRef] = useState(emptySpans);

  const keyHandler = (event) => {
    console.log(text);
    const { key } = event;
    if (key === " ") {
      setText((prev) => [...prev, " "]);
      setCurrentIndex((prev) => prev + 1);
      setCurrentWordIndex((prev) => prev + 1);
    } else if (/^[a-zA-Z.,]$/.test(key)) {
      setText((prev) => [...prev, key]);
      setCurrentIndex((prev) => prev + 1);
    } else if (key === "Backspace") {
      if (text[text.length - 1] === " ") {
        setCurrentWordIndex((prev) => prev - 1);
      }
      setText(text.slice(0, text.length - 1));
      setCurrentIndex((prev) => prev - 1);

    }
  };
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
        {focus && text.length === 0 && (
          <div className="absolute z-1 mt-5">
            <CursorBlinker />
          </div>
        )}
        <div className="absolute tracking-tightest">
          <div className="text-left text-white tracking-wide leading-loose">
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
          onKeyDown={keyHandler}
          className="leading-loose text-left h-52 tracking-wide"
          tabIndex={0}
          onBlur={() => setFocus(false)}
          onFocus={() => {
            setFocus(true);
          }}
        >
          {words.map((word, ind) => {
            return (
              <span ref={wordRef[ind]} key={ind}>
                {word + " "}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Test;
