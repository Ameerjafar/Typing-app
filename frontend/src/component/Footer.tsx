import { Tag } from "lucide-react";
import { Bird } from "lucide-react";
import { Palette } from "lucide-react";
const Footer = () => {
  return (
    <div>
      <div className="mt-44 overflow-hidden container">
        <div className="flex justify-between w-full text-mono text-gray-500">
          <div className="flex space-x-5 ">
            <div className="flex space-x-2">
              <Tag className="size-4 mt-1 font-bold" />
              <a
                href="https://github.com/Ameerjafar/Typing-app"
                className="font-mono"
              >
                github
              </a>
            </div>
            <div className="flex space-x-2">
              <Bird className="size-4 mt-1 font-bold" />
              <a href="https://x.com/AJTECH37177095" className="font-mono">
                Twitter
              </a>
            </div>
            <div className="flex space-x-2">
              <a href="https://github.com/Ameerjafar" className="font-mono">
                created by @AmeerJafar
              </a>
            </div>
          </div>
          <div className = 'flex space-x-2 mr-20'>
            <Palette />
            <div>vs code</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
