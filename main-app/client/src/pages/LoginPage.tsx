// React
import { useEffect } from "react";
// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Hook
import { checkToken } from "@/hooks/use-verify";
// Components
import LoginForm from "@/components/auth/LoginForm";
// Assets
import people1 from '../assets/people1.webp';

export default function LoginPage() {

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const isAuthenticated = await checkToken();
      if (isAuthenticated) {
        navigate('/home');
      }
    }
    checkUser();
  }, [navigate]);

  return (
    <div className="w-screen h-auto md:h-svh flex flex-col md:flex-row">
      <div className="w-screen md:w-1/2 h-svh flex flex-col items-center justify-center">
        <LoginForm />
      </div>
      <div className="w-screen md:w-1/2 md:h-svh overflow-hidden flex items-center justify-center relative bg-zinc-900">
        <img
          src={people1}
          className="z-40 blur-sm w-full h-full object-cover opacity-30"
          alt="People walking and connecting in a busy city environment"
        />
        <h1 className="absolute text-center text-balance max-w-md text-zinc-50 z-50 font-extrabold text-4xl md:text-5xl">
          Connect, share, and grow your ideas with <span className="text-orange-500">postonreddit</span>
        </h1>
      </div>
    </div>
  );
}
