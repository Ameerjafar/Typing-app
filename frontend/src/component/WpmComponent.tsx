import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { correctedAtom } from "../store/textAtom";
import { timeAtom } from "../store/TimeAtom";

const WpmComponent = () => {
  const textLength = useRecoilValue(correctedAtom);
  const time = useRecoilValue(timeAtom);
  const [wpm, setWpm] = useState<string>("0");
  useEffect(() => {
    const min = time / 60;
    const word = Math.round(textLength / 5 / min).toFixed(2);
    setWpm(word);
  }, [textLength, time]);
  return <div className="text-black">{ wpm }</div>;
};

export default WpmComponent;
