import { Box } from "@mui/material";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const WeatherChart: React.FC<{ data: any }> = ({ data }) => {
    const chartData = data.daily.time.map((time: string, index: number) => ({
        date: time,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
    }));

    return (
        <Box>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="date" tick={{ fill: "#ffffff" }} />
                    <YAxis tick={{ fill: "#ffffff" }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#ffffff",
                            color: "#000000",
                        }}
                    />
                    <Legend wrapperStyle={{ color: "#ffffff" }} />
                    <Line type="monotone" dataKey="maxTemp" stroke="#ffffff" />
                    <Line type="monotone" dataKey="minTemp" stroke="#ffffff" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default WeatherChart;
