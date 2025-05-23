import { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogIn, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function LoginForm() {
    const navigate: NavigateFunction = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // Funzione per permettere ad un utente di accedere alla piattaforma
    const handleLogin = async () => {
        const errors = handleValidateCredentials(email, password);
        if (errors.length <= 0) {
            setIsLoading(true);
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
            } finally {
                setIsLoading(false);
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

    // Handle form submission with Enter key
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <Card className="w-[90%] md:w-[400px] bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-lg">
            <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-bold text-center">Welcome back!</CardTitle>
                <CardDescription className="text-center text-zinc-500 dark:text-zinc-400">
                    Sign in to your account to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="emailInputId" className="text-zinc-700 dark:text-zinc-300">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400 w-4 h-4" />
                        <Input
                            aria-label="input-email-login"
                            id="emailInputId"
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-10 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:border-orange-500 dark:focus:border-orange-500" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="passwordInputId" className="text-zinc-700 dark:text-zinc-300">Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400 w-4 h-4" />
                        <Input
                            aria-label="input-password-login"
                            id="passwordInputId"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="pl-10 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 focus:border-orange-500 dark:focus:border-orange-500" />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-500">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <Button
                    aria-label="button-login"
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={handleLogin}
                    disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign in
                        </>
                    )}
                </Button>

                <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Don't have an account?{" "}
                    <Link to="/registration" className="font-medium text-orange-500 hover:text-orange-600 transition-colors">
                        Sign up
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
