import WpmComponent from "./WpmComponent";
import { updateTestCompleted } from "./UpdataUserData";
import { useEffect, useRef } from "react";
const Result = () => {
  const hasEffectRun = useRef(false);
  useEffect(() => {
    if(hasEffectRun.current === true) return;
    updateTestCompleted();
    hasEffectRun.current = true;
  }, [])
  return (
    <div className = 'bg-[#121212] w-full h-screen flex justify-center items-center'>
      <WpmComponent />
    </div>
  )
}
// here i have to make the api call for the type information.
export default Result;
