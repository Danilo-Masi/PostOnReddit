// Components
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-screen h-auto md:h-svh flex flex-col md:flex-row ">
      <div className="w-screen md:w-1/2 h-svh flex flex-col items-center justify-center">
        <LoginForm />
      </div>
      <div className="w-screen h-svh md:w-1/2 bg-primary">

      </div>
    </div>
  )
}
