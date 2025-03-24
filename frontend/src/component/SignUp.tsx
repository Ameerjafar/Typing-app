import { z } from 'zod'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const zodScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
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
        navigate('/login')
    }
    else {
        console.log("Your are not met the form constraits");
    }
}


  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Create your account</h2>
        </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#cccccc]">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-[#2d2d2d] border border-[#3e3e3e] rounded-md text-white placeholder-[#6b6b6b] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#cccccc]">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-[#2d2d2d] border border-[#3e3e3e] rounded-md text-white placeholder-[#6b6b6b] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#cccccc]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-[#2d2d2d] border border-[#3e3e3e] rounded-md text-white placeholder-[#6b6b6b] focus:outline-none focus:ring-2 focus:ring-[#0078d4] focus:border-transparent"
                placeholder="Create a password"
              />
            </div>
          </div>

          <button
            onClick={ handleSubmit }
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0078d4] hover:bg-[#006cbd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078d4]"
          >
            Create account
          </button>

          <div className="text-center">
            <p className="text-sm text-[#cccccc]">
              Already have an account?{' '}
              <button className="font-medium text-[#0078d4] hover:text-[#006cbd]">
                Sign in
              </button>
            </p>
          </div>
      </div>
    </div>
  );
}

export default SignUp;
