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
    peakHour: string;
    activityScore: number;
}

// Configurazione del grafico
const chartConfig = {
    desktop: {
        label: "User active: ",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function Chart({ subreddit }: { subreddit: string }) {

    const navigate: NavigateFunction = useNavigate();
    const [chartData, setChartData] = useState<ChartData[]>([]);

    // Funzione per recuperare e analizzare i dati dal backend
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

            if (response.status !== 200) {
                setChartData([]);
                toast.info("No data found for this subreddit!");
            }

            const transformedData = response.data.map((item: ChartData) => ({
                day: item.day,
                activeUsers: item.activityScore,
                peakHour: item.peakHour
            }))

            setChartData(transformedData);

        } catch (error: any) {
            console.error("CLIENT: Errore nel caricamento dei dati: ", error.stack);
            setChartData([]);
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
                    content={<ChartTooltipContent indicator="dot" hideLabel  />} />
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
