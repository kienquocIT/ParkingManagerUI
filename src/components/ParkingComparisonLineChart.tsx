import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import {Box, Typography} from "@mui/material";

export default function ParkingComparisonLineChart({ data }) {
    return (
        <Box className="shadow-lg bg-white rounded p-5">
            <Typography variant="h6" fontWeight="bold" className="mb-3">
                Actual vs Prediction
            </Typography>

            <ResponsiveContainer width="100%" height={350}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {/* Actual */}
                    <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#1976d2"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        name="Actual"
                    />

                    {/* Prediction */}
                    <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="#ff9800"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        name="Prediction"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}
