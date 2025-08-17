import Test from "./Test";
import Reset from "../ui/Reset";
import Footer from "./Footer";
import CounterComponent from "./CounterComponent";
import Header from "./Header";
import TimerComponent from "./TimerComponent";
const Hero = () => {
  const multiplayer = localStorage.getItem("isMultiPlayer")
  return (
    <div className='relative'>
      <div className='pb-20'>
        <Header />
      </div>
      {/* <div className=''>
        {multiplayer !== "true" && <TimerComponent />}
      </div> */}
      <div className='text-4xl mt-6'><CounterComponent /></div>
      <div className = 'flex justify-center'><TimerComponent /></div>
      <div
        className="relative  text-[#333333] text-xl md:text-4xl font-mono overflow-hidden">
        <Test />
      </div>
      <div className="flex justify-center mt-2">
        <Reset />
      </div>
      <Footer />
    </div>
  );
};
export default Hero;
