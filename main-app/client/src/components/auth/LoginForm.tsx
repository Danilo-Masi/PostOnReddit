// React
import { useState } from "react";
// React-router
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
// Shadcnui
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
// Icons
import { LogIn } from 'lucide-react';
// Components
import Logo from "../custom/Logo";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

export default function LoginForm() {

    const navigate: NavigateFunction = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = async () => {

        // VALIDAZIONE DEI DATI

        try {
            const response = await axios.post(`${SERVER_URL}/login`, {
                email: email,
                password: password,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 400) {
                alert('I dati inseriti non sono validi'); //DA MODIFICARE
                return;
            }

            if (response.status === 401) {
                alert('Errore durante la fase di login, riprova più tardi'); //DA MODIFICARE
                return;
            }

            if (response.status === 200) {
                handleSuccess(response.data.token);
            }

        } catch (error: any) {
            console.error('CLIENT: Errore generico del server', error.message);
            alert('Errore generico del server, riprova più tardi'); //DA MODIFICARE
            handleReset();
        }
    }

    const handleSuccess = (token: string) => {
        localStorage.setItem('authToken', token);
        alert('Accesso avvenuto con successo') // DA MODIFICARE
        navigate('/home');
    }

    const handleReset = () => {
        setEmail("");
        setPassword("");
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
