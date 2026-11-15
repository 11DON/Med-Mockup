
import {
    LineChart, Line, XAxis, YAxis, ReferenceLine, ResponsiveContainer, Tooltip,
} from "recharts";

const GREEN = "#00b050";
const BLUE = "#5b9bd5";

function SessionTick({ x, y, payload, rows }) {
    const row = rows.find((r) => r.session === payload.value);

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={16} textAnchor="middle" fill="#333" fontSize={12}>{payload.value}</text>
            <text dy={32} textAnchor="middle" fill={BLUE} fontSize={12}>{row?.date ?? ""}</text>
        </g>
    )
}
export default function ProgressChart({ data = [],
    dates = {},
    totalSessions = 9,
    target = 10,
    yMax = 10,
    yStep = 2,
    yLabel = "Seconds",
    xLabel = "Session No.",
    height = 300, }) {

    const rows = Array.from({ length: totalSessions }, (_, i) => {
        const session = i + 1;
        const found = data.find((d) => d.session === session);
        return { session, date: found?.date ?? dates[session] ?? "", value: found?.value };
    });

    const ticks = Array.from({ length: Math.floor(yMax / yStep) }, (_, i) => (i + 1) * yStep);
    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={rows} margin={{ top: 28, right: 70, bottom: 30, left: 10 }}>
                <XAxis
                    dataKey="session"
                    interval={0}
                    padding={{ left: 20, right: 20 }}
                    tick={<SessionTick rows={rows} />}
                    label={{ value: xLabel, position: "right", offset: 10, fill: BLUE, fontSize: 12 }}
                />
                <YAxis
                    domain={[0, yMax]}
                    ticks={ticks}
                    label={{ value: yLabel, position: "top", offset: 14, fill: BLUE, fontSize: 12 }}
                />
                <ReferenceLine
                    y={target}
                    stroke="#888"
                    strokeDasharray="5 4"
                    label={{ value: "Target", position: "right", fill: "#f4a460", fontSize: 12 }}
                />
                <Tooltip formatter={(v) => [v, yLabel]} labelFormatter={(s) => `Session ${s}`} />
                <Line
                    type="linear"
                    dataKey="value"
                    stroke={GREEN}
                    strokeWidth={1.5}
                    dot={{ r: 3, fill: GREEN }}
                    connectNulls={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}