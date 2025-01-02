import { UserPlus } from "lucide-react";
import { z } from 'zod'
import { useState } from "react";
import axios from 'axios';
const zodScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
const SignUp = () => {
    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ fullName, setFullName ] = useState<string>("");
    const sumbitHandler = async () => {
        const clientSideChecking = zodScheme.parse({
            email,
            password
        })
        if(clientSideChecking) {
            await axios.post(`${import.meta.env.VITE_API_PATH}/auth/signup`, {
                fullName,
                email,
                password 
            })
        }
        else {
            console.log("Your are not met the from constraits");
        }
    }
  return (
    <div>
      <div className="flex justify-center items-center h-screen w-full bg-[#121212] font-mono text-white">
        <div className = 'space-y-5'>
          <div className = 'flex space-x-3'>
            <UserPlus />
            <div className="font-bold text-2xl">Register</div>
          </div>
          <div>
            <input onChange = {(e) => setFullName(e.target.value)} placeholder="FullName" className = 'bg-[#121212] border-2 rounded-md p-2 w-72'></input>
          </div>
          <div>
            <input onChange = { (e) => setEmail(e.target.value) } placeholder="Email" className = 'bg-[#121212] border-2 rounded-md p-2 w-72'></input>
          </div>
          <div>
            <input onChange = { (e) => setPassword(e.target.value)} placeholder="password" className = 'bg-[#121212] border-2 rounded-md p-2 w-72'></input>
          </div>
          <button onClick = { sumbitHandler } className = 'w-full bg-black/50 text-center h-10'>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
