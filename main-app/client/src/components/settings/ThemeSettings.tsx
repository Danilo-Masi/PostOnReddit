import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CardBase from "../custom/CardBase";
import { useTheme } from "../theme/ThemeProvider";

type Theme = "dark" | "light"

interface ThemeToyProps {
    containerColor: string;
    itemColor: string;
}

// Componente grafico per visualizzare il tema
export const ThemeToy = ({ containerColor, itemColor }: ThemeToyProps) => {
    return (
        <div className={`w-[90%] flex items-start justify-start flex-wrap gap-2 p-5 rounded-xl absolute -bottom-2 -right-2 ${containerColor}`}>
            <div className={`w-6 h-6 rounded-full ${itemColor}`} />
            <div className={`w-[calc(100%-2rem)] h-6 rounded-2xl ${itemColor}`} />
            <div className={`w-full h-3 rounded-2xl ${itemColor}`} />
            <div className={`w-[calc(50%-0.25rem)] h-2 rounded-2xl ${itemColor}`} />
            <div className={`w-[calc(50%-0.25rem)] h-2 rounded-2xl ${itemColor}`} />
            <div className={`w-[calc(70%-0.25rem)] h-2 rounded-2xl ${itemColor}`} />
            <div className={`w-[calc(30%-0.25rem)] h-2 rounded-2xl ${itemColor}`} />
            <div className={`w-full h-2 rounded-2xl ${itemColor}`} />
        </div>
    );
}

export default function ThemeSettings() {

    const { setTheme } = useTheme();
    const [selectedTheme, setSelectedTheme] = useState<Theme>("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("vite-ui-theme") as Theme | null;
        if (storedTheme) {
            setSelectedTheme(storedTheme);
        }
    }, [setTheme]);

    // Funzione per modificare il tema della piattaforma
    const handleThemeChange = (value: Theme) => {
        setSelectedTheme(value);
        setTheme(value);
        localStorage.setItem("vite-ui-theme", value);
    }

    return (
        <CardBase
            cardTitle="Interface theme"
            cardDescription="Customize your app theme"
            mdWidth="md:w-1/3">
            <RadioGroup
                defaultValue="light"
                value={selectedTheme}
                onValueChange={handleThemeChange}
                className="flex flex-col justify-between items-start gap-y-3 w-full h-full">
                <Label
                    htmlFor="dark"
                    className={`w-full h-[30svh] flex items-center justify-center border rounded-xl cursor-pointer relative overflow-hidden bg-zinc-600 ${selectedTheme === "dark" && 'border-2 border-orange-500'}`}>
                    <RadioGroupItem value="dark" id="dark" className="hidden" />
                    <ThemeToy
                        containerColor="bg-zinc-700"
                        itemColor="bg-zinc-600" />
                </Label>
                <Label
                    htmlFor="light"
                    className={`w-full h-[30svh] flex items-center justify-center border rounded-xl cursor-pointer relative overflow-hidden bg-zinc-100 ${selectedTheme === "light" && 'border-2 border-orange-500'}`}>
                    <RadioGroupItem value="light" id="light" className="hidden" />
                    <ThemeToy
                        containerColor="bg-zinc-200"
                        itemColor="bg-zinc-100" />
                </Label>
            </RadioGroup>
        </CardBase>
    );
}
