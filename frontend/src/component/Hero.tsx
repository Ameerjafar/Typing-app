import TypingLogic from "./TypingLogic";
import Reset from "../ui/Reset";
import TimerComponent from "./TimerComponent";
import WpmComponent from "./WpmComponent";
const Hero = () => {
  return (
    <div>
      <TimerComponent />
      <WpmComponent />
      <div
        className="relative mt-20 text-[#333333] text-4xl text-left line-clamp-3">
        <TypingLogic />
      </div>
      <div className="flex justify-center mt-2">
        <Reset />
      </div>
    </div>
  );
};
export default Hero;
