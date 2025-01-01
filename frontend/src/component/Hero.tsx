import Test from "./Test";
import Reset from "../ui/Reset";
import Footer from "./Footer";
import CounterComponent from "./CounterComponent";
const Hero = () => {
  return (
    <div className = 'relative'>
      <div className = 'text-4xl mt-10'><CounterComponent /></div>
      <div
        className="relative text-[#333333] text-4xl font-mono overflow-hidden ">
        <Test />
      </div>
      <div className="flex justify-center mt-2">
        <Reset />
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Hero;
