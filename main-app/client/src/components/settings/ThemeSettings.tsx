// React
import { useState } from "react";
// Shadcnui
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// Components
import CardBase from "../custom/CardBase";

interface ThemeToyProps {
    containerColor: string;
    itemColor: string;
}

export const ThemeToy = ({ containerColor, itemColor }: ThemeToyProps) => {
    return (
        <div className={`w-[90%] h-auto flex items-start justify-start flex-wrap gap-2 p-5 rounded-xl absolute -bottom-2 -right-2 ${containerColor}`}>
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

    const [selectedTheme, setSelectedTheme] = useState("dark");

    return (
        <CardBase
            cardTitle="Interface theme"
            cardDescription="Customize your app theme"
            mdWidth="md:w-[30%]">
            <RadioGroup
                defaultValue="dark"
                value={selectedTheme}
                onValueChange={setSelectedTheme}
                className="w-full h-full flex flex-col gap-y-3 items-start justify-between">
                <Label
                    htmlFor="dark"
                    className={`w-full min-h-[33svh] flex items-center justify-center border rounded-xl cursor-pointer relative overflow-hidden bg-zinc-600 ${selectedTheme === "dark" && 'border-2 border-orange-500'}`}>
                    <RadioGroupItem value="dark" id="dark" className="hidden" />
                    <ThemeToy
                        containerColor="bg-zinc-700"
                        itemColor="bg-zinc-600" />
                </Label>
                <Label
                    htmlFor="light"
                    className={`w-full min-h-[33svh] flex items-center justify-center border rounded-xl cursor-pointer relative overflow-hidden bg-zinc-100 ${selectedTheme === "light" && 'border-2 border-orange-500'}`}>
                    <RadioGroupItem value="light" id="light" className="hidden" />
                    <ThemeToy
                        containerColor="bg-zinc-200"
                        itemColor="bg-zinc-100" />
                </Label>
            </RadioGroup>
        </CardBase>
    );
}
