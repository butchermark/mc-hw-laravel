import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import useFetchWeather from "./hooks/useFetchWeather";
import { ResponsiveContainer } from "recharts";

const WeatherDisplay: React.FC<{ city: any }> = ({ city }) => {
    const { weatherData, loading, error } = useFetchWeather(city);

    function getDayOfWeek(dateString: string) {
        const date = new Date(dateString);
        const daysOfWeek = [
            "Vasárnap",
            "Hétfő",
            "Kedd",
            "Szerda",
            "Csütörtök",
            "Péntek",
            "Szombat",
        ];
        return daysOfWeek[date.getDay()];
    }

    const weatherCodesToText = (code: number): string => {
        const weatherDescriptions: { [key: number]: string } = {
            0: "Tiszta ég",
            1: "Részben felhős",
            2: "Felhős",
            3: "Borús",
            45: "Ködös",
            48: "Zúzmarás köd",
            51: "Gyenge szitálás",
            53: "Mérsékelt szitálás",
            55: "Erős szitálás",
            56: "Fagyos szitálás",
            57: "Erős fagyos szitálás",
            61: "Gyenge eső",
            63: "Mérsékelt eső",
            65: "Erős eső",
            66: "Fagyos eső",
            67: "Erős fagyos eső",
            71: "Gyenge havazás",
            73: "Mérsékelt havazás",
            75: "Erős havazás",
            80: "Zápor",
            81: "Erős zápor",
            82: "Heves zápor",
            95: "Viharos",
            96: "Vihar jégesővel",
            99: "Erős vihar jégesővel",
        };

        return weatherDescriptions[code] || "Ismeretlen időjárási kód";
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return (
            <Typography>
                Error fetching weather data: {error.message}
            </Typography>
        );
    }

    if (!weatherData) {
        return <Typography>No weather data available</Typography>;
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
                <Typography sx={{ fontSize: "48px", fontWeight: "400" }}>
                    {weatherData.daily.temperature_2m_max[0]}°C
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                    {weatherCodesToText(weatherData.daily.weather_code[0])}
                </Typography>
            </Box>
            <Box>
                <List>
                    {weatherData.daily.time.map(
                        (date: string, index: number) => (
                            <ListItem key={index}>
                                <Typography
                                    sx={{ fontSize: "20px", fontWeight: "400" }}
                                >
                                    {getDayOfWeek(date)}:
                                </Typography>
                                {"     "}
                                <Typography
                                    sx={{ fontSize: "20px", fontWeight: "400" }}
                                >
                                    {
                                        weatherData.daily
                                            .precipitation_probability_max[
                                            index
                                        ]
                                    }
                                </Typography>
                                %{"     "}
                                <Typography
                                    sx={{ fontSize: "20px", fontWeight: "400" }}
                                ></Typography>
                                <Typography
                                    sx={{ fontSize: "20px", fontWeight: "400" }}
                                >
                                    {
                                        weatherData.daily.temperature_2m_max[
                                            index
                                        ]
                                    }
                                    °C -{" "}
                                    {
                                        weatherData.daily.temperature_2m_min[
                                            index
                                        ]
                                    }
                                    °C
                                </Typography>
                            </ListItem>
                        )
                    )}
                </List>
            </Box>
        </Box>
    );
};

export default WeatherDisplay;
