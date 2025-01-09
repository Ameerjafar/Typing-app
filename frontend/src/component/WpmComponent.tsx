import { useEffect, useState, useRef } from "react";
import { useRecoilValue } from "recoil";
import { textAtom } from "../store/textAtom";
import { timeAtom } from "../store/TimeAtom";
import { paragraph } from "../store/paragraph";
import axios from "axios";
import { fetchAccuracy } from "../UserData";

const WpmComponent = () => {
  const [wpm, setWpm] = useState("0");
  const [accuracy, setAccuracy] = useState("0");
  const text = useRecoilValue(textAtom);
  const words = useRecoilValue(paragraph);
  const time = useRecoilValue(timeAtom);
  const AccuracyRef = useRef(false);
  const [correctedCharacters, setCorrectedCharacter] = useState<number>(0);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const characters = words
      .map((word) => [...word.split(""), " "])
      .flat();

    const correctCount = text.reduce((count, char, index) => {
      return char === characters[index] ? count + 1 : count;
    }, 0);
    setCorrectedCharacter(correctCount);
    const min = time / 60;
    const word = (correctedCharacters / 5 / min).toFixed(2);
    const acc = ((correctedCharacters / text.length) * 100).toFixed(2);
    console.log(word);
    setWpm(word);
    setAccuracy(acc);

    const postData = async () => {
      try {
        console.log("This is the word", word, "This is the acc", acc);
        const response = await axios.post(
          `${import.meta.env.VITE_API_PATH}/user/addData/${userId}`,
          {
            wpm: word,
            second: time,
            accuracy: acc,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error while saving data:", error);
      }
    };
    if(!AccuracyRef.current && wpm !== '0' && acc !== '0') {
      postData()
      AccuracyRef.current = true;
    }
  }, [ wpm, accuracy ]);

  return (
    <div className="font-mono text-3xl text-[#333333]">
      <div>{wpm} wpm</div>
      <div className="mt-3">{accuracy} Accuracy</div>
      <button className="w-36 h-20 mt-4 border-2 text-white">Restart</button>
    </div>
  );
};

export default WpmComponent;
