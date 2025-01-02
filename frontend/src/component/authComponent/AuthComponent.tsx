import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthComponent = () => {
  return (
    <div className="bg-[#121212]">
      <div className = 'sm:mx-10 lg:mx-48'>
        <div className="flex justify-between w-full space-x-32">
          <div>
            <SignUp />
          </div>
          <div>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthComponent;
