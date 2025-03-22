import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div className="flex justify-between items-center font-mono w-full px-4 py-3 sm:px-6 md:px-8">
      <button 
        className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-all"
        onClick={() => navigate("/")}
      >
        Typing-App
      </button>

      <div className="flex mr-10 items-center text-white space-x-3 sm:space-x-6 md:space-x-10">
        <span className="text-sm sm:text-base md:text-xl lg:text-2xl hover:text-gray-300 cursor-pointer transition-colors">
          Multiplayer
        </span>

        {token ? (
          <button
            onClick={() => navigate("/profile")}
            className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full 
                     text-black font-bold bg-white hover:bg-gray-200 
                     transition-all flex items-center justify-center
                     text-sm sm:text-base md:text-lg"
          >
            U
          </button>
        ) : <button className = "text-sm sm:text-base md:text-xl lg:text-2xl hover:text-gray-300 cursor-pointer transition-colors" onClick = { () => navigate('/login')}>Login</button>}
      </div>
    </div>
  );
};

export default Header;
