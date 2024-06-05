"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"; 
const LoginPage = () => {
    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const router=useRouter();

      const handleFormSubmit = async(e:any) => {
        e.preventDefault();
        try {
            const res=await axios.post("/api/users/login",{email, password});
            if (res.data) {
                router.push("/frontview/profile/")
                console.log(res.data);

            }
        } catch (error:any) {
          console.log(error.message);   
        }
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 w-full border rounded-md"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              Don't have an account? <Link href="/frontview/signup" className="text-blue-500">Sign up</Link>
            </p>
          </div>
        </div>
      );
    };
  
  export default LoginPage