import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";

export default function ParkingComparisonLineChart({
                                                       rawData,
                                                       predictData,
                                                   }: {
    rawData: RawPoint[];
    predictData: PredictPoint[];
}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

            {/* ===== RAW CHART ===== */}
            <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                    <LineChart data={rawData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="value"
                            name="Actual"
                            stroke="#1976d2"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* ===== PREDICT CHART ===== */}
            <div style={{ width: "100%", height: 350 }}>
                <ResponsiveContainer>
                    <LineChart data={predictData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="value"
                            name="Predicted"
                            stroke="#d32f2f"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}
