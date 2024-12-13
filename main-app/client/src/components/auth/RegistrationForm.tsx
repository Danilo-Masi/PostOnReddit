// React
import { useState } from "react";
// React-router
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
// Context
import { useAppContext } from "../context/AppContext"
// Axios
import axios from 'axios';
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

export default function RegistrationForm() {

    const navigate: NavigateFunction = useNavigate();

    const { setCreditsDialogOpen } = useAppContext();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegistration = async () => {
        //VALIDAZIONE DATI
        try {
            const response = await axios.post(`${SERVER_URL}/registration`, {
                name: name,
                email: email,
                password: password,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 400) {
                handleError("Dati inseriti non validi");
                return;
            }

            if (response.status === 200) {
                handleSuccess(response.data.token);

            }
        } catch (error: any) {
            handleError(error);
        }
    }

    const handleSuccess = (token: string) => {
        localStorage.setItem('authToken', token);
        alert('Registrazione avvenuta con successo') // DA RIMPIAZZARE
        setCreditsDialogOpen(true);
        navigate('/home');
    }

    const handleError = (error: any) => {
        alert('Dati inseriti non validi'); // DA RIMPIAZZARE
        console.log('CLIENT: ', error.message);
        resetValues();
    }

    const resetValues = () => {
        setName("");
        setEmail("");
        setPassword("");
    }

    return (
        <Card className="w-[90%] md:w-1/2 flex flex-col gap-y-1 bg-background shadow-md shadow-elevation3">
            <CardHeader className="w-full flex items-center justify-center">
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
                    className="w-full bg-buttonColor hover:bg-buttonHoverColor"
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
