import TimerComponent from "./TimerComponent";

const Header = () => {
  return (
    <div className="flex font-mono">
      <button className="text-white font-bold text-4xl">Typing-App</button>
      <div className = 'flex justify-end w-full space-x-2'>
        <p className = 'text-white mt-10'>Time -</p>
        <div><TimerComponent /></div>
      </div>
    </div>
  );
};
export default Header;
