// React
import { useState } from "react";
// React-router
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
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

// Url del server
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function LoginForm() {

    const navigate: NavigateFunction = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Funzione per permettere ad un utente di accedere alla piattaforma
    const handleLogin = async () => {
        const errors = handleValidateCredentials(email, password);
        if (errors.length <= 0) {
            try {
                const response = await axios.post(`${SERVER_URL}/auth/login`, {
                    email: email,
                    password: password,
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                if (response.status === 400) {
                    handleError("Invalid credentials", response.status);
                    return;
                }

                if (response.status === 401) {
                    handleError("Login failed. Please try again later", response.status);
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

    // Funzione per validare le credenziali inserite dall'utente in fase di accesso
    const handleValidateCredentials = (email: string, password: string): string[] => {
        const errors: string[] = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{6,}$/;

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
        setEmail("");
        setPassword("");
    }

    // Funzione per gestire il successo
    const handleSuccess = (token: string) => {
        localStorage.setItem('authToken', token);
        toast.success("Access successful");
        navigate('/');
    }

    return (
        <Card className="flex flex-col gap-y-1 bg-background shadow-elevation3 shadow-md w-[90%] md:w-1/2 bg-zinc-100 dark:bg-zinc-700">
            <CardHeader className="flex justify-center items-center w-full">
                <CardTitle><Logo /></CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-300">Welcome back to postonreddit!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-2">
                <Label aria-label="emailInputId">Email Address</Label>
                <Input
                    aria-label="input-email-login"
                    id="emailInputId"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-700 dark:placeholder:text-zinc-500" />
            </CardContent>
            <CardContent className="flex flex-col gap-y-2">
                <Label>Password</Label>
                <Input
                    aria-label="input-password-login"
                    id="passwordInputId"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-700 dark:placeholder:text-zinc-500" />
            </CardContent>
            <CardFooter className="flex flex-col gap-y-2">
                <Button
                    aria-label="button-login"
                    type="submit"
                    className="w-full bg-orange-500 dark:bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-600 text-zinc-50 dark:text-zinc-50"
                    onClick={handleLogin}>
                    <LogIn /> Log In to Your Account
                </Button>
                <Link to="/registration" className="text-foreground">
                    Don't have an account? <span className="hover:text-orange-500">Sign up here</span>
                </Link>
            </CardFooter>
        </Card>
    );
}
