// React
import { useEffect } from "react";
// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Hook
import { checkToken } from "@/hooks/use-verify";
// Components
import LoginForm from "@/components/auth/LoginForm";
import AuthHero from "@/components/auth/AuthHero";

export default function LoginPage() {

  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const isAuthenticated = await checkToken();
      if (isAuthenticated) {
        navigate('/');
      }
    }
    checkUser();
  }, [navigate]);

  return (
    <div className="w-screen h-auto md:h-svh flex flex-col md:flex-row bg-zinc-100 dark:bg-zinc-800">
      <div className="w-screen md:w-1/2 h-svh flex flex-col items-center justify-center">
        <LoginForm />
      </div>
      <AuthHero />
    </div>
  );
}
