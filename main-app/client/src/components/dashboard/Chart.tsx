// React
import { useEffect, useState } from "react";
// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
// Re-chart
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// Shadcnui
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";
import { toast } from "sonner";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

interface ChartData {
    day: string;
    activeUsers: number;
}

// Funzione per ottenere gli ultimi 7 giorni
const getLast7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const day = date.toLocaleString('en-us', { weekday: 'short' });
        days.push(day);
    }
    return days;
}

// Dati causali di default
const chartDataDefault = getLast7Days().map(day => ({
    day,
    activeUsers: Math.floor(Math.random() * 300),
}));

// Configurazione del grafico
const chartConfig = {
    desktop: {
        label: "User active",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function Chart({ subreddit }: { subreddit: string }) {

    const navigate: NavigateFunction = useNavigate();
    const [chartData, setChartData] = useState<ChartData[]>(chartDataDefault);

    const fetchData = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            toast.error("User without permissions");
            navigate('/login');
            return;
        }

        if (subreddit.trim().length < 2) {
            return;
        }

        try {
            const response = await axios.get(`${SERVER_URL}/api/reddit-stats`, {
                params: { q: subreddit },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                //setChartData(response.data);
            } else {
                setChartData(chartDataDefault);
            }
        } catch (error: any) {
            console.error("CLIENT: Errore nel caricamento dei dati: ", error.stack);
            setChartData(chartDataDefault);
        }
    }

    useEffect(() => {
        fetchData();
    }, [subreddit]);


    return (
        <ChartContainer
            config={chartConfig}
            className="w-full min-h-[200px] z-0">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{ left: 12, right: 12 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />} />
                <Area
                    type="monotone"
                    dataKey="activeUsers"
                    stroke="var(--color-desktop)"
                    fill="var(--color-desktop)"
                    fillOpacity={0.3} />
            </AreaChart>
        </ChartContainer>
    );
}
