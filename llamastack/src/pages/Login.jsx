import React, { useEffect } from 'react'
import LoginForm from '@/components/LoginForm'
import { Button } from "@/components/ui/button"
import { Link, useLocation } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { ArrowLeft } from 'lucide-react'

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isDemo = searchParams.get('login') === 'demo';

  useEffect(() => {
    if (isDemo) {
      console.log('Demo mode: user=test@test.com, password=password');
    }
  }, [isDemo]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4 relative">
      <Link to="/" className="absolute top-4 right-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </Link>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Log in to your 🦙 LlamaStack account</h1>
        <p className="text-sm text-gray-400 mb-8 text-center">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
        <LoginForm isDemo={isDemo} />
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-gray-900 to-blue-900 text-gray-400">Or log in with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-700" onClick={() => alert('Google sign-in not implemented')}>
              <FcGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-700" onClick={() => alert('Facebook sign-in not implemented')}>
              <FaFacebook className="mr-2 h-4 w-4 text-blue-600" />
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login