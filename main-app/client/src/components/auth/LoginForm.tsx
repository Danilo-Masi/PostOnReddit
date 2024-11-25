// React
import { useState } from "react";
// React-router
import { Link } from "react-router-dom";
// Shadcnui
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// Icons
import { LogIn } from 'lucide-react';
// Components
import Logo from "../custom/Logo";

export default function LoginForm() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        alert(`Login user: ${email}`);
    }

    return (
        <Card className="w-[90%] md:w-1/2 flex flex-col gap-y-1 bg-background shadow-md shadow-elevation3">
            <CardHeader className="w-full flex items-center justify-center">
                <CardTitle><Logo /></CardTitle>
                <CardDescription>Welcome back to PostOnReddit</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
                <Label aria-label="emailInputId">Email</Label>
                <Input
                    id="emailInputId"
                    type="email"
                    placeholder="email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            </CardContent>
            <CardContent className="flex flex-col gap-y-2">
                <Label>Password</Label>
                <Input
                    id="passwordInputId"
                    type="password"
                    placeholder="·········"
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            </CardContent>
            <CardFooter className="flex flex-col gap-y-2">
                <Button
                    type="submit"
                    className="w-full bg-buttonColor hover:bg-buttonHoverColor"
                    onClick={handleLogin}>
                    <LogIn /> Login to your account
                </Button>
                <Link to="/registration" className="text-foreground hover:text-primary">
                    Dont'have an account?
                </Link>
            </CardFooter>
        </Card>
    )
}
