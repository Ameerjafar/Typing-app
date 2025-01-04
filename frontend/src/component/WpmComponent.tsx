import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { textAtom } from "../store/textAtom";
import { timeAtom } from "../store/TimeAtom";
import { paragraph } from "../store/paragraph";
import axios from "axios";
const WpmComponent = ({
  wpm,
  setWpm,
  accuracy,
  setAccuracy,
}: {
  wpm: string;
  setWpm: (arg: string) => void;
  accuracy: string;
  setAccuracy: (arg: string) => void;
}) => {
  const text = useRecoilValue(textAtom);
  const words = useRecoilValue(paragraph);
  const time = useRecoilValue(timeAtom);
  const [correctedCharacters, setCorrectedCharacter] = useState<number>(0);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
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
    const word = Math.round(correctedCharacters / 5 / min).toFixed(2);
    console.log(word);
    const acc = ((correctedCharacters / text.length) * 100).toFixed(2);
    console.log(acc);
    setWpm(word);
    setAccuracy(acc);
    // const fetchData = async () => {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_API_PATH}/user/addData/${userId}`,
    //     {
    //       wpm: word,
    //       second: time,
    //       accuracy: acc,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   console.log(response.data);
    // };
    // fetchData();
    // callRef.current = true;
  }, [wpm]);
  return (
    <div className="font-mono text-3xl text-[#333333]">
      <div>{wpm} wpm</div>
      <div className="mt-3">{accuracy} Accuracy</div>
      <button className="w-36 h-20 mt-4 border-2 text-white">Restart</button>
    </div>
  );
};

export default WpmComponent;
