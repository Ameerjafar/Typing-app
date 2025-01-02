import axios from "axios";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from 'zod'
import jwt from 'jsonwebtoken';
const zodScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

const SignIn = () => {

    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const navigate = useNavigate();
    console.log(`${import.meta.env.VITE_API_PATH}/auth/signin`)
    const sumbitHandler = async () => {
        const clientSideChecking = zodScheme.parse({
            email,
            password
        })
        if(clientSideChecking) {
            const response = await axios.post(`${import.meta.env.VITE_API_PATH}/auth/signin`, {
                email,
                password
            })
            navigate('/');
            const token = response.data.token
            const object = jwt.decode(token)
            console.log(object)
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
            <div className = 'mt-1'>
                <LogIn />
            </div>
            <div className="font-bold text-2xl">Login</div>
          </div>
          <div>
            <input onChange = { (e) => setEmail(e.target.value) } placeholder="Email" className = 'bg-[#121212] border-2 rounded-md p-2 w-72'></input>
          </div>
          <div>
            <input onChange = { (e) => setPassword(e.target.value)} placeholder="password" className = 'bg-[#121212] border-2 rounded-md p-2 w-72'></input>
          </div>
          <button onClick = { sumbitHandler } className = 'w-full bg-black/50 text-center h-10'>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
