import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCities = (searchTerm: string, shouldFetch: boolean) => {
    const [cities, setCities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            setLoading(true);
            axios
                .get(`/search-city`, {
                    params: { name: searchTerm },
                })
                .then((response) => {
                    setCities(response.data.results);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [shouldFetch]);

    return { cities, loading };
};

export default useFetchCities;
