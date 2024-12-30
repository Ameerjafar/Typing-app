import { useEffect, useState, createRef } from "react";
import CursorBlinker from "../ui/CursorBlinker";
import { useRecoilState, useSetRecoilState } from "recoil";
import { textAtom } from "../store/textAtom";
import { paragraphActive, paragraphFocus } from "../store/paragraph";
import CounterComponent from "./CounterComponent";
import { randomWord } from "./wordList";

const TypingLogic = () => {
  const [text, setText] = useRecoilState(textAtom);
  const [wordCharacter, setWordCharacter] = useState<string[]>();
  const [words, setWords] = useState<string[]>(randomWord);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [focus, setFocus] = useRecoilState(paragraphFocus);
  const setIsActive = useSetRecoilState(paragraphActive);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [ LineCrossed, setLineCrossed ] = useState<number>(0);
  const emptySpans = () => {
    return Array(words.length)
      .fill(0)
      .map((i) => createRef<HTMLSpanElement>());
  };
  const [wordSpanRef, setWordSpanRef] = useState(emptySpans());

  const handleKeyDown = (event) => {
    const { key } = event;
    console.log(key);
    setIsActive(true);
    if (key === " ") {
      setText([...text, " "]);
      console.log(wordCharacter![currentIndex], "this is the word character");
      if (wordCharacter![currentIndex] === " ") {
        console.log(
          wordCharacter![currentIndex],
          "hello this is the word character"
        );
        setCurrentWordIndex((prev) => prev + 1);
      }
    } else if (key === "Backspace") {
      if (text[currentIndex] === " ") {
        setCurrentWordIndex((prev) => prev - 1);
      }
      setText(text.slice(0, text.length - 1));
    } else if (/^[a-zA-Z.,]$/.test(key)) {
      setText([...text, key]);
    }

    setCurrentIndex(text.length);
  };

  useEffect(() => {
    const wordCharacter = words
      .map((word) => {
        return [...word.split(""), " "];
      })
      .flat();
    setWordCharacter(wordCharacter);
  }, []);
  useEffect(() => {
    console.log(wordSpanRef);
    console.log(currentWordIndex);
    console.log(
      wordSpanRef[currentWordIndex].current?.offsetLeft,
      wordSpanRef[currentWordIndex + 1].current?.offsetLeft
    );
    if (
      currentWordIndex >= 1 && wordSpanRef[currentWordIndex -  1].current!.offsetLeft >
        wordSpanRef[currentWordIndex].current!.offsetLeft
    ) {
      setLineCrossed(prev=> prev + 1);
      if((LineCrossed % 2) === 0) {
        wordSpanRef[currentWordIndex].current!.scrollIntoView({
          behavior: "smooth", 
        })
      }
    }
  }, [currentWordIndex]);
  return (
    <div className=" overflow-hidden overflow-x-hidden">
      <CounterComponent />
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocus(true)}
      >
        {!focus && (
          <div className="absolute z-0 flex mb-3 justify-center w-full h-full items-center text-white">
            click here to focus on the content
          </div>
        )}
        {focus && text.length === 0 && (
          <div className="absolute z-0 mt-3">
            <CursorBlinker />
          </div>
        )}
        <div className="absolute z-0 leading-loose">
          {text.map((character, ind) => {
            const inCorrect = wordCharacter![ind] !== character;
            const i = ind === currentIndex;
            console.log(wordCharacter);
            return (
              <span key={ind}>
                {inCorrect ? (
                  <span
                    className={`${
                      wordCharacter![ind] === " "
                        ? "bg-red-500"
                        : "text-red-500"
                    }`}
                  >
                    {wordCharacter![ind]}
                  </span>
                ) : (
                  <span className="text-white">{character}</span>
                )}
                {i && <CursorBlinker />}
              </span>
            );
          })}
        </div>
        <div
          className={`leading-loose ${
            focus ? "blur-none" : "blur-sm"
          } overflow-hidden h-52`}
        >
          {words.map((word, ind) => {
            return (
              <span
                className="inline-block mr-5"
                ref={wordSpanRef[ind]}
                key={ind}
              >
                {" "}
                {word}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TypingLogic;
