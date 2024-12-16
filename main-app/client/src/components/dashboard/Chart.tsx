// Reachart
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
// Shadcunui
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";

// Chart data
const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

// Chart config
const chartConfig = {
    desktop: {
        label: "User active",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function Chart() {
    return (
        <ChartContainer config={chartConfig} className="w-full min-h-[200px]">
            <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />} />
                <Area
                    dataKey="desktop"
                    type="linear"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)" />
            </AreaChart>
        </ChartContainer>
    );
}
