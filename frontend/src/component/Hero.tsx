import Test from "./Test";
import Reset from "../ui/Reset";
import Footer from "./Footer";
import CounterComponent from "./CounterComponent";
import Header from "./Header";
import TimerComponent from "./TimerComponent";
import { isMultiPlayer } from "../store/textAtom";
import { useRecoilValue } from 'recoil';
const Hero = () => {
  const multiplayer = useRecoilValue(isMultiPlayer);
  return (
    <div className = 'relative'>
      <div className = 'pb-20'>
        <Header />
      </div>
      <div className = ''>
        <TimerComponent />
      </div>
        <div className = 'text-4xl mt-6'><CounterComponent /></div>
      {/* <div><TimerComponent /></div> */}
      <div
        className="relative text-[#333333] text-xl md:text-4xl font-mono overflow-hidden">
        <Test />
      </div>
      <div className="flex justify-center mt-2">
        {!multiplayer && <Reset /> }
      </div>
      <Footer />
    </div>
  );
};
export default Hero;
