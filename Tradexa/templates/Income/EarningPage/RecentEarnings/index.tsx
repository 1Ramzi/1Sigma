import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Percentage from "@/components/Percentage";
import { SelectOption } from "@/types/select";

import { recentEarningsChartData } from "@/mocks/charts";

const RecentEarnings = ({}) => {
    const { t } = useLanguage();

    const durations: SelectOption[] = [
        { id: 1, name: t.last7Days },
        { id: 2, name: t.lastMonth },
        { id: 3, name: t.lastYear },
    ];

    const [duration, setDuration] = useState<SelectOption>(durations[0]);

    const totalWins = recentEarningsChartData.reduce((s, d) => s + d.amt, 0);
    const totalLosses = recentEarningsChartData.reduce((s, d) => s + d.amt2, 0);
    const winRate = totalWins + totalLosses > 0 ? ((totalWins / (totalWins + totalLosses)) * 100).toFixed(1) : '0';

    const CustomTooltip = ({
        payload,
        label,
    }: {
        payload: { value: number; dataKey: string }[];
        label: string;
    }) => {
        if (payload && payload.length) {
            return (
                <div className="chart-tooltip text-caption">
                    <div className="mb-1 font-semibold">{label}</div>
                    {payload.map((p, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className={p.dataKey === 'amt' ? 'text-primary-02' : p.dataKey === 'amt2' ? 'text-primary-03' : 'text-t-secondary'}>
                                {p.dataKey === 'amt' ? t.won : p.dataKey === 'amt2' ? t.lost : 'Net'}:
                            </span>
                            <span className="font-bold">{p.value}</span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <Card
            title={t.tradeHistory7d}
            selectValue={duration}
            selectOnChange={setDuration}
            selectOptions={durations}
            headContent={
                <Button
                    className="mr-3 max-md:hidden"
                    icon="calendar-1"
                    isCircle
                    isStroke
                />
            }
        >
            <div className="pt-6 px-5 pb-5 max-lg:p-3">
                <div className="h-88">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            width={500}
                            height={280}
                            data={recentEarningsChartData}
                            barSize={28}
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="5 7"
                                vertical={false}
                                stroke="var(--stroke-stroke2)"
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: "12px",
                                    fill: "var(--text-tertiary)",
                                }}
                                height={38}
                                dy={16}
                            />
                            <YAxis
                                type="number"
                                width={44}
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: "12px",
                                    fill: "var(--text-tertiary)",
                                    fillOpacity: 0.8,
                                }}
                                allowDecimals={false}
                            />
                            <Tooltip
                                content={
                                    <CustomTooltip payload={[]} label="" />
                                }
                                cursor={false}
                            />
                            <Bar
                                dataKey="amt"
                                name={t.won}
                                fill="var(--chart-green)"
                                fillOpacity={0.6}
                                activeBar={{
                                    fill: "var(--chart-green)",
                                    fillOpacity: 1,
                                }}
                                radius={[4, 4, 0, 0]}
                            />
                            <Bar
                                dataKey="amt2"
                                name={t.lost}
                                fill="var(--color-primary-03)"
                                fillOpacity={0.4}
                                activeBar={{
                                    fill: "var(--color-primary-03)",
                                    fillOpacity: 0.7,
                                }}
                                radius={[4, 4, 0, 0]}
                            />
                            <Line
                                type="monotone"
                                dataKey="uv"
                                stroke="var(--color-shade-07)"
                                strokeOpacity={0.3}
                                strokeWidth={2}
                                dot={{
                                    r: 4,
                                    strokeWidth: 3,
                                    strokeOpacity: 0.6,
                                    fill: "var(--backgrounds-surface2)",
                                }}
                                activeDot={{
                                    r: 4,
                                    fill: "var(--color-chart-green)",
                                    stroke: "var(--backgrounds-surface2)",
                                    strokeWidth: 3,
                                }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex items-center gap-6 mt-3">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-[var(--chart-green)]" />
                        <span className="text-body-2 text-t-secondary">{t.won}: <strong className="text-t-primary">{totalWins}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm bg-primary-03/60" />
                        <span className="text-body-2 text-t-secondary">{t.lost}: <strong className="text-t-primary">{totalLosses}</strong></span>
                    </div>
                    <Percentage className="ml-auto" value={parseFloat(winRate)} />
                    <div className="text-body-2 text-t-tertiary">
                        {t.winRate}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RecentEarnings;
