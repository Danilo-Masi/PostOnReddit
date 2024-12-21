// React
import { useEffect, useState } from "react";
// Axios
import axios from "axios";
// Reachart
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// Shadcunui
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

interface ChartData {
    day: string;
    activeUsers: number;
}

// Funzione per ottenere i 7 giorni della settimana precedenti
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

// Funzione per generare dati casuali di default
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

    const [chartData, setChartData] = useState<ChartData[]>(chartDataDefault);

    useEffect(() => {
        const fetchData = async () => {
            if (!subreddit) return;

            try {
                const response = await axios.get(`${SERVER_URL}/api/reddit-stats?subreddit)=${subreddit}`);
                if (response.status === 200) {
                    setChartData(response.data);
                } else {
                    setChartData(chartDataDefault);
                }
            } catch (error: any) {
                console.error("CLIENT: Errore nel caricamento dei dati del chart", error.message);
                setChartData(chartDataDefault);
            }
        }
        fetchData();
    }, [subreddit]);


    return (
        <ChartContainer
            config={chartConfig}
            className="w-full min-h-[200px]">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}>
                <CartesianGrid vertical={false} />
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
                    dataKey="activeUsers"
                    type="linear"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)" />
            </AreaChart>
        </ChartContainer>
    );
}
