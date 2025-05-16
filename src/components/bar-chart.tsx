"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Januari", igd: 186, ugd: 80 },
  { month: "Februari", igd: 305, ugd: 200 },
  { month: "Maret", igd: 237, ugd: 120 },
  { month: "April", igd: 73, ugd: 190 },
  { month: "Mei", igd: 209, ugd: 130 },
  { month: "Juni", igd: 214, ugd: 140 },
  { month: "Juli", igd: 214, ugd: 140 },
  { month: "Agustus", igd: 214, ugd: 140 },
  { month: "September", igd: 214, ugd: 140 },
  { month: "Oktober", igd: 214, ugd: 140 },
  { month: "November", igd: 214, ugd: 140 },
  { month: "Desembar", igd: 214, ugd: 140 },
];

const chartConfig = {
  igd: {
    label: "igd",
    color: "hsl(var(--chart-1))",
  },
  ugd: {
    label: "ugd",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function barChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Pasien</CardTitle>
        <CardDescription>January - Desember 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData} height={100}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="igd" fill="var(--color-igd)" radius={8} />
            <Bar dataKey="ugd" fill="var(--color-ugd)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Data Pasien Setiap Bulan <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
