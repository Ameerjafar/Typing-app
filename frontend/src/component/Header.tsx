import { useNavigate } from "react-router-dom";
import TimerComponent from "./TimerComponent";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(
    localStorage.getItem("isLogin") === "true"
  );
  return (
    <div className="flex font-mono">
      <button className="text-white font-bold text-4xl">Typing-App</button>
      <div className="justify-end w-full space-x-2">
        <div className="text-white mt-10">Time -</div>
        {isLogin && (
          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="h-10 w-10 rounded-full"
          >
            U
          </button>
        )}
        <div>
          <TimerComponent />
        </div>
      </div>
    </div>
  );
};
export default Header;
