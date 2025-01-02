import TimerComponent from "./TimerComponent";

const Header = () => {
  return (
    <div className="flex font-mono">
      <button className="text-white font-bold text-4xl">Typing-App</button>
        <div className = 'justify-end w-full space-x-2'>
        <div className = 'text-white mt-10'>Time -</div>
        <div><TimerComponent /></div>
      </div>
    </div>
  );
};
export default Header;
