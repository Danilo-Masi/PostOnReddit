// React
import { useState } from "react";
// React-router
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
// Context
import { useAppContext } from "../context/AppContext";
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
    const { setCreditsDialogOpen } = useAppContext();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Funzione per registrare un nuovo utente sulla piattaforma
    const handleRegistration = async () => {
        const errors = handleValidateCredentials(name, email, password);
        if (errors.length <= 0) {
            try {
                const response = await axios.post(`${SERVER_URL}/registration`, {
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
    const handleValidateCredentials = (name: string, email: string, password: string) => {
        let errors: string[] = [];
        if (name.length === 0) {
            errors.push("Name can't be empty");
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email.length === 0) {
            errors.push("Email can't be empty");
        } else if (!emailRegex.test(email)) {
            errors.push("Email is not valid");
        }
        if (password.length < 6) {
            errors.push("Password must be at least 6 characters\n");
        }
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        if (!passwordRegex.test(password)) {
            errors.push("Password must contain at least one letter, one number, and one special character\n");
        }
        return errors;
    }

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
        setCreditsDialogOpen(true);
        navigate('/home');
    }

    return (
        <Card className="flex flex-col gap-y-1 bg-background shadow-elevation3 shadow-md w-[90%] md:w-1/2">
            <CardHeader className="flex justify-center items-center w-full">
                <CardTitle><Logo /></CardTitle>
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
                    className="bg-buttonColor hover:bg-buttonHoverColor w-full"
                    onClick={() => handleRegistration()}>
                    <LogIn /> Register new account
                </Button>
                <Link to="/login" className="text-foreground hover:text-primary">
                    Have an account yet?
                </Link>
            </CardFooter>
        </Card>
    );
}
