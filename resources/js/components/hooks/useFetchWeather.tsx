import { useState, useEffect } from "react";
import axios from "axios";
import { IWeatherData } from "../../interfaces/IWeatherData.interface";

const useFetchWeather = (city: any) => {
    const [weatherData, setWeatherData] = useState<IWeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!city) return;

        const fetchWeather = async () => {
            try {
                setLoading(true);
                const response = await axios.get("/api/weather", {
                    params: {
                        latitude: city.latitude,
                        longitude: city.longitude,
                    },
                });
                console.log(response.data);
                setWeatherData(response.data);
                setError(null);
            } catch (err: any) {
                setError(err);
                setWeatherData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);

    return { weatherData, loading, error };
};

export default useFetchWeather;
