import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";

export default function RegistrationPage() {
  return (
    <div className="w-screen h-auto md:h-svh flex flex-col md:flex-row ">
      <div className="w-screen md:w-1/2 h-svh flex flex-col items-center justify-center">
        <Card className="w-[90%] md:w-1/2 flex flex-col gap-y-1">
          <CardHeader className="w-full flex items-center justify-center">
            <CardTitle className="text-3xl font-semibold text-primary">PostOnReddit</CardTitle>
            <CardDescription>Welcome to PostOnReddit</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-2">
            <Label>Name</Label>
            <Input type="text" placeholder="name" />
          </CardContent>
          <CardContent className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="email" />
          </CardContent>
          <CardContent className="flex flex-col gap-y-2">
            <Label>Password</Label>
            <Input type="password" placeholder="·········" />
          </CardContent>
          <CardFooter className="flex flex-col gap-y-2">
            <Button className="w-full hover:ring-2 ring-primary border-0">
              <LogIn /> Register new account
            </Button>
            <Link to="/login" className="text-foreground hover:text-primary">
              Have an account yet?
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="w-screen h-svh md:w-1/2 bg-primary">

      </div>
    </div>
  )
}
