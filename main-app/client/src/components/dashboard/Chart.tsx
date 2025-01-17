// React
import { Dispatch, SetStateAction, useEffect } from "react";
// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
// Re-chart
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// Shadcnui
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { toast } from "sonner";
import { Card } from "../ui/card";

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

interface ChartData {
    day: string;
    peakHour: string;
    activity: number;
}

interface ChartProps {
    subreddit: string;
    chartData: ChartData[];
    setChartData: Dispatch<SetStateAction<ChartData[]>>;
    isDataLoading: boolean;
    setDataLoading: Dispatch<SetStateAction<boolean>>;
}

// Configurazione del grafico
const chartConfig = {
    desktop: {
        label: "User active: ",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function Chart({ subreddit, chartData, setChartData, setDataLoading }: ChartProps) {

    const navigate: NavigateFunction = useNavigate();

    // Funzione per recuperare e analizzare i dati dal backend
    const fetchData = async () => {

        setDataLoading(true);

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
                setDataLoading(false);
                toast.info("No data found for this subreddit!");
                return;
            }

            const transformedData = response.data.map((item: ChartData) => ({
                day: item.day,
                activity: item.activity,
                peakHour: item.peakHour
            }));

            setChartData(transformedData);
            setDataLoading(false);

        } catch (error: any) {
            console.error("CLIENT: Errore nel caricamento dei dati: ", error.stack);
            setChartData([]);
            setDataLoading(false);
        }
    }

    // Funzione per creare la tooltip personalizzata
    const renderTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length > 0) {
            const { day, peakHour, activity } = payload[0].payload;

            return (
                <Card className="p-3 flex flex-col">
                    <p className="mb-2"><b>{day}</b></p>
                    <p>• Peak hour: {peakHour}</p>
                    <p>• Activity: {activity}</p>
                </Card>
            );
        }
        return null;
    };

    useEffect(() => {
        if (subreddit.trim().length > 1) {
            fetchData();
        }
    }, [subreddit]);


    return (
        <ChartContainer
            config={chartConfig}
            className="w-full">
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
                <ChartTooltip cursor={false} content={renderTooltip} />
                <Area
                    type="monotone"
                    dataKey="activity"
                    stroke="var(--color-desktop)"
                    fill="var(--color-desktop)"
                    fillOpacity={0.3} />
            </AreaChart>
        </ChartContainer>
    );
}
