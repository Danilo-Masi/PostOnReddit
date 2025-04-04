import { useEffect, useState, memo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { checkToken } from "@/hooks/use-verify";
import RegistrationForm from "@/components/auth/RegistrationForm";
import AuthHero from "@/components/auth/AuthHero";
import { Loader2 } from "lucide-react";

const MemoizedAuthHero = memo(AuthHero);

export default function RegistrationPage() {
  const navigate: NavigateFunction = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const checkUser = async () => {
      try {
        const authStatus = await checkToken();
        if (isMounted) {
          setIsAuthenticated(!!authStatus);
          if (authStatus) {
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkUser();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="w-screen h-svh flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="w-screen h-svh flex flex-col md:flex-row bg-zinc-100 dark:bg-zinc-800">
      <div className="w-screen md:w-1/2 h-svh flex flex-col items-center justify-center">
        <RegistrationForm />
      </div>
      <MemoizedAuthHero />
    </div>
  );
}
