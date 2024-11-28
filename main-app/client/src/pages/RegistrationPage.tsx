// React
import { useEffect } from "react";
// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Hook
import { checkToken } from "@/hooks/use-verify";
// Components
import RegistrationForm from "@/components/auth/RegistrationForm";

export default function RegistrationPage() {

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
    <div className="w-screen h-auto md:h-svh flex flex-col md:flex-row ">
      <div className="w-screen md:w-1/2 h-svh flex flex-col items-center justify-center">
        <RegistrationForm />
      </div>
      <div className="w-screen h-svh md:w-1/2 bg-primary">

      </div>
    </div>
  )
}
