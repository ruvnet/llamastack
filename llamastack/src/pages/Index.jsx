import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { useSupabaseAuth } from '@/integrations/supabase'
import Footer from '@/components/Footer'

const Index = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isDemo = searchParams.get('login') === 'demo';

  useEffect(() => {
    if (session) {
      navigate('/profile');
    }
  }, [session, navigate]);

  const handleLoginClick = () => {
    if (isDemo) {
      navigate('/login?login=demo');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-48 h-48 flex items-center justify-center mb-8 overflow-hidden">
          <dotlottie-player
            src="https://lottie.host/323f36ba-34f2-4957-8c77-55d392c05385/NbvphhXN88.json"
            background="transparent"
            speed="1"
            style={{ width: '300px', height: '300px' }}
            direction="1"
            playMode="normal"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <h1 className="text-4xl sm:text-5xl font-railway font-bold mb-4 text-center">Welcome to LlamaStack</h1>
        <p className="text-xl sm:text-2xl mb-8 text-center">Revolutionizing AI with Advanced Agentic Engineering</p>
        <div className="flex flex-col space-y-4 w-full max-w-md mb-6">
          <Button asChild size="lg" className="w-full bg-white text-blue-900 hover:bg-gray-100 hover:text-blue-800">
            <Link to="/register">Sign Up</Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-blue-900" onClick={handleLoginClick}>
            Log In
          </Button>
          {isDemo && (
            <Button size="lg" variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white hover:text-blue-900" onClick={() => navigate('/login?login=demo')}>
              Demo Login
            </Button>
          )}
        </div>
        <div className="w-full max-w-md">
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-white/60">Or Login/Register with:</span>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent border-white text-white hover:bg-white hover:text-blue-900"
              onClick={() => alert('Google sign-in not implemented')}
            >
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent border-white text-white hover:bg-white hover:text-blue-900"
              onClick={() => alert('Facebook sign-in not implemented')}
            >
              <FaFacebook className="mr-2 h-5 w-5 text-blue-600" />
              Continue with Facebook
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Index