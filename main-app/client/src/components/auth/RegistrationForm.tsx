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

export default function RegistrationForm() {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegistration = () => {
        alert(`Registration of ${name}'s account`);
    }

    return (
        <Card className="w-[90%] md:w-1/2 flex flex-col gap-y-1">
            <CardHeader className="w-full flex items-center justify-center">
                <CardTitle className="text-3xl font-semibold text-primary">PostOnReddit</CardTitle>
                <CardDescription>Welcome to PostOnReddit</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
                <Label htmlFor="registrationNameInput">Name</Label>
                <Input
                    id="registrationNameInput"
                    type="text"
                    placeholder="name"
                    required
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            </CardContent>
            <CardContent className="flex flex-col gap-y-2">
                <Label htmlFor="registrationEmailInput">Email</Label>
                <Input
                    id="registrationEmailInput"
                    type="email"
                    placeholder="email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
            </CardContent>
            <CardContent className="flex flex-col gap-y-2">
                <Label htmlFor="registrationPasswordInput">Password</Label>
                <Input
                    id="registrationPasswordInput"
                    type="password"
                    placeholder="·········"
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
            </CardContent>
            <CardFooter className="flex flex-col gap-y-2">
                <Button
                    type="button"
                    className="w-full hover:ring-2 ring-primary border-0"
                    onClick={handleRegistration}>
                    <LogIn /> Register new account
                </Button>
                <Link to="/login" className="text-foreground hover:text-primary">
                    Have an account yet?
                </Link>
            </CardFooter>
        </Card>
    );
}
