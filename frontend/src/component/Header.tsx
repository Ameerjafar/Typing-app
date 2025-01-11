import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(
    localStorage.getItem("isLogin") === "true"
  );
  return (
    <div className="flex justify-between font-mono w-full">
      <button className="text-white font-bold md:text-4xl">Typing-App</button>
      <div className="flex text-white font-bold text-2xl space-x-10 mt-2">
      <span>Multiplayer</span>
        {isLogin && (
          <button
            onClick={() => {
              navigate("/profile");
            }}
            className="h-10 w-10 rounded-full text-black font-bold bg-white"
          >
            U
          </button>
        )}

      </div>
    </div>
  );
};
export default Header;
