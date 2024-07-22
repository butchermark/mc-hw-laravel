import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import CitySearch from "./CitySearch";
import useFetchWeather from "./hooks/useFetchWeather";
import WeatherChart from "./WeatherChart";
import WeatherDisplay from "./WeatherDisplay";

const HomePage: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState<any>(null);
    const { weatherData } = useFetchWeather(selectedCity);

    useEffect(() => {
        const savedCity = localStorage.getItem("selectedCity");
        if (savedCity) {
            setSelectedCity(JSON.parse(savedCity));
        }
    }, []);

    const handleCitySelect = (city: any) => {
        setSelectedCity(city);
        localStorage.setItem("selectedCity", JSON.stringify(city));
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                background: "linear-gradient(to bottom, #7dbae8, #a3d4fa)",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <CitySearch onCitySelect={handleCitySelect} />

            <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                {selectedCity && <WeatherDisplay city={selectedCity} />}
                {weatherData && <WeatherChart data={weatherData} />}
            </Box>
        </Box>
    );
};
export default HomePage;
