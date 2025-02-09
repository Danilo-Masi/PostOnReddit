// React
import { useEffect, useState } from "react";
// Components
import MainContainer from "../custom/MainContainer";
import StartButton from "../custom/StartButton";
import { BackgroundLines } from "../ui/backgound-lines";
// Icons
import { Check } from "lucide-react";
// Axios
import axios from 'axios';

const WAITLIST_ID = import.meta.env.VITE_WAITLIST_ID;

const getLeadboard = async () => {
    try {
        const response = await axios.get(`https://api.getwaitlist.com/api/v1/waitlist?waitlist_id=${WAITLIST_ID}`, {
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
            return response.data.statistics.total_signups;
        } else {
            console.error("CLIENT: Errore nel recupero dei dati dalla waitlist");
            return 0;
        }
    } catch (error: any) {
        console.error("CLIENT: Waitlist API error:", error.message);
        return 0;
    }
};

export default function Hero({ id }: { id: string }) {

    const [waitlistUsers, setWaitlistUsers] = useState<number | null>(null);

    useEffect(() => {
        const fetchWaitlistUsers = async () => {
            const totalSignups = await getLeadboard();
            setWaitlistUsers(totalSignups)
        }
        fetchWaitlistUsers();
    }, []);

    return (
        <MainContainer marginTop="mt-0" minHeigth="min-h-svh" id={id}>
            <BackgroundLines className="flex flex-col items-center justify-center gap-y-12">
                <div className="max-w-full md:max-w-1/2 flex flex-col items-center justify-center gap-y-8 md:gap-y-8 z-40">
                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl md:max-w-3xl text-balance font-extrabold text-zinc-900">
                        Grow your SaaS with perfect Reddit <span className="text-zinc-50 bg-orange-500 px-4 pb-1 rounded-xl">timing</span>
                    </h1>
                    {/* Description */}
                    <h3 className="text-lg md:text-xl text-balance font-medium text-zinc-600">
                        Let data decide the best time <br />to engage your audience
                    </h3>
                    {/* Values */}
                    <ul className="text-zinc-500">
                        <li className="w-full flex items-center justify-start"><Check className="w-5 h-5 mr-2 text-orange-500" />100% free to use (for now 😉)</li>
                        <li className="w-full flex items-center justify-start"><Check className="w-5 h-5 mr-2 text-orange-500" />No more posts lost in the void</li>
                        <li className="w-full flex items-center justify-start"><Check className="w-5 h-5 mr-2 text-orange-500" />Trusted by founders and creator</li>
                    </ul>
                    {/* CTA */}
                    <div className="flex flex-col items-center gap-y-2">
                        <StartButton buttonStyle="w-fit bg-orange-500 hover:bg-orange-600" />
                        <p className="font-light text-zinc-600 text-balance">✌️ Join the other <span className="font-extrabold">{waitlistUsers}</span> creators and founder!</p>
                    </div>
                </div>
            </BackgroundLines>
        </MainContainer>
    );
}
