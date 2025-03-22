import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod'
import axios from 'axios'

const zodScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    const clientSideChecking = zodScheme.parse({
        email,
        password
    })
    if(clientSideChecking) {
        const response =  await axios.post(`${import.meta.env.VITE_API_PATH}/auth/signin`, {
            email,
            password
        })
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
  
        navigate('/');
    }
    else {
        console.log("Your are not met the from constraits");
    }
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0078d4] hover:bg-[#006cbd] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0078d4]"
          >
            Sign in
          </button>

          <div className="text-center">
            <p className="text-sm text-[#cccccc]">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-[#0078d4] hover:text-[#006cbd]">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
