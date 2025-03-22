import { Tag, Bird, Palette } from "lucide-react";

const Footer = () => {
  return (
    <div className="mt-20 overflow-hidden container">
      <div className="flex flex-col md:flex-row justify-between w-full text-mono text-gray-500 space-y-4 md:space-y-0">
        {/* Left Section */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">
          <div className="flex space-x-2">
            <Tag className="size-4 mt-1 font-bold" />
            <a
              href="https://github.com/Ameerjafar/Typing-app"
              className="font-mono hover:text-gray-700"
            >
              github
            </a>
          </div>
          <div className="flex space-x-2">
            <Bird className="size-4 mt-1 font-bold" />
            <a href="https://x.com/AJTECH37177095" className="font-mono hover:text-gray-700">
              Twitter
            </a>
          </div>
          <div className="flex space-x-2">
            <a href="https://github.com/Ameerjafar" className="font-mono hover:text-gray-700">
              created by @AmeerJafar
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex space-x-2 md:mr-20">
          <Palette className="size-4 mt-1" />
          <div>vs code</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;