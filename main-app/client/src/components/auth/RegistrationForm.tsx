// React
import { useState } from "react";
// React-router
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
// Axios
import axios from 'axios';
// Shadcnui
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// Icons
import { LogIn } from 'lucide-react';
// Components
import Logo from "../custom/Logo";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export default function RegistrationForm() {

    const navigate: NavigateFunction = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Funzione per registrare un nuovo utente sulla piattaforma
    const handleRegistration = async () => {
        const errors = handleValidateCredentials(name, email, password);
        if (errors.length <= 0) {
            try {
                const response = await axios.post(`${SERVER_URL}/auth/registration`, {
                    name: name,
                    email: email,
                    password: password,
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 400) {
                    handleError("Invalid credentials", response.status);
                    return;
                }

                if (response.status === 200) {
                    handleSuccess(response.data.token);
                }
            } catch (error: any) {
                console.error('CLIENT: Errore generico del server', error.stack);
                handleError("Server error. Please try again later", error.status);
            }
        } else {
            errors.map(error => {
                toast.warning(error);
            });
        }
    }

    // Funzione per validare le credenziali inserite dall'utente in fase di registrazione
    const handleValidateCredentials = (name: string, email: string, password: string): string[] => {
        const errors: string[] = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{6,}$/;

        if (!name.trim()) {
            errors.push("Name can't be empty");
        }

        if (!email.trim()) {
            errors.push("Email can't be empty");
        } else if (!emailRegex.test(email)) {
            errors.push("Email is not valid");
        }

        if (password.length < 6) {
            errors.push("Password must be at least 6 characters");
        } else if (!passwordRegex.test(password)) {
            errors.push("Password must contain at least one letter, one number, and one special character");
        }

        return errors;
    };

    // Funzione per gestire gli errori
    const handleError = (errorMsg: string, status: number) => {
        console.error(`CLIENT: Error status: ${status}`);
        toast.warning(errorMsg);
        setName("");
        setEmail("");
        setPassword("");
    }

    // Funzione per gestire il successo
    const handleSuccess = (token: string) => {
        localStorage.setItem('authToken', token);
        toast.success("Registration successful");
        navigate('/');
    }

    return (
        <Card className="flex flex-col gap-y-1 bg-background shadow-elevation3 shadow-md w-[90%] md:w-1/2 bg-zinc-100 dark:bg-zinc-700">
            <CardHeader className="flex justify-center items-center w-full">
                <CardTitle><Logo /></CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-300">Welcome to PostOnReddit!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
                <Label htmlFor="registrationNameInput">Full Name</Label>
                <Input
                    aria-label="input-name-registration"
                    id="registrationNameInput"
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-700 dark:placeholder:text-zinc-500" />
            </CardContent>
            <CardContent className="flex flex-col gap-y-2">
                <Label htmlFor="registrationEmailInput">Email Address</Label>
                <Input
                    aria-label="input-email-registration"
                    id="registrationEmailInput"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-700 dark:placeholder:text-zinc-500" />
            </CardContent>
            <CardContent className="flex flex-col gap-y-2">
                <Label htmlFor="registrationPasswordInput">Password</Label>
                <Input
                    aria-label="input-password-registration"
                    id="registrationPasswordInput"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-700 dark:placeholder:text-zinc-500" />
            </CardContent>
            <CardFooter className="flex flex-col gap-y-2">
                <Button
                    aria-label="button-registration"
                    type="submit"
                    className="w-full bg-orange-500 dark:bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-600 text-zinc-50 dark:text-zinc-50"
                    onClick={() => handleRegistration()}>
                    <LogIn /> Register a New Account
                </Button>
                <Link to="/login" className="text-foreground">
                    Already have an account? <span className="hover:text-orange-500">Log in here</span>
                </Link>
            </CardFooter>
        </Card>
    );
}
