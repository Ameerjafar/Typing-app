import TypingLogic from "./TypingLogic";
import Reset from "../ui/Reset";
import Footer from "./Footer";
const Hero = () => {
  return (
    <div>
      {/* <WpmComponent /> */}
      <div
        className="relative mt-20 text-[#333333] text-4xl text-left font-mono overflow-hidden">
        <TypingLogic />
      </div>
      <div className="flex justify-center mt-2">
        <Reset />
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Hero;
