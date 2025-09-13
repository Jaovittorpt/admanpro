import { DollarSign, BarChart, MousePointerClick, TrendingUp, Percent, Target, ArrowRightLeft } from 'lucide-react';

export const kpiData = [
  {
    title: "Spend",
    value: "$45,231.89",
    icon: DollarSign,
    trend: "+20.1%",
    trendDirection: 'up' as const,
  },
  {
    title: "Impressions",
    value: "1,230,500",
    icon: BarChart,
    trend: "+180.1%",
    trendDirection: 'up' as const,
  },
  {
    title: "Clicks",
    value: "23,194",
    icon: MousePointerClick,
    trend: "+19%",
    trendDirection: 'up'as const,
  },
  {
    title: "CTR",
    value: "1.88%",
    icon: Percent,
    trend: "-2.1%",
    trendDirection: 'down' as const,
  },
  {
    title: "CPC",
    value: "$1.95",
    icon: DollarSign,
    trend: "+1.2%",
    trendDirection: 'up' as const,
  },
  {
    title: "Conversions",
    value: "842",
    icon: Target,
    trend: "+32.5%",
    trendDirection: 'up' as const,
  },
  {
    title: "ROAS",
    value: "4.2x",
    icon: ArrowRightLeft,
    trend: "+0.5x",
    trendDirection: 'up' as const,
  },
];


export const spendData = [
    { date: "2024-05-01", spend: 1200 },
    { date: "2024-05-02", spend: 1350 },
    { date: "2024-05-03", spend: 1100 },
    { date: "2024-05-04", spend: 1500 },
    { date: "2024-05-05", spend: 1400 },
    { date: "2024-05-06", spend: 1650 },
    { date: "2024-05-07", spend: 1550 },
    { date: "2024-05-08", spend: 1800 },
    { date: "2024-05-09", spend: 1750 },
    { date: "2024-05-10", spend: 1900 },
];

export const conversionsData = [
    { name: "Campaign A", conversions: 400, fill: "var(--color-spend)" },
    { name: "Campaign B", conversions: 300, fill: "var(--color-conversions)" },
    { name: "Campaign C", conversions: 200, fill: "var(--color-clicks)" },
    { name: "Campaign D", conversions: 278, fill: "var(--color-impressions)" },
    { name: "Campaign E", conversions: 189, fill: "var(--color-roas)" },
];

export const chartConfig = {
    spend: {
      label: "Spend",
      color: "hsl(var(--chart-1))",
    },
    conversions: {
        label: "Conversions",
        color: "hsl(var(--chart-2))",
    },
    clicks: {
        label: "Clicks",
        color: "hsl(var(--chart-3))",
    },
    impressions: {
        label: "Impressions",
        color: "hsl(var(--chart-4))",
    },
    roas: {
        label: "ROAS",
        color: "hsl(var(--chart-5))",
    }
} as const;
