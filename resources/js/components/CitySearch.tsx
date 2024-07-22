import React, { useEffect, useState } from "react";
import useFetchCities from "./hooks/useFetchCities";
import {
    Box,
    Button,
    Input,
    ListItem,
    List,
    Modal,
    Container,
    Typography,
} from "@mui/material";

const CitySearch: React.FC<{ onCitySelect: (city: any) => void }> = ({
    onCitySelect,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [shouldFetch, setShouldFetch] = useState(false);
    const [showModal, setShowModal] = useState(true);
    const { cities, loading } = useFetchCities(searchTerm, shouldFetch);
    const [currentCity, setCurrentCity] = useState<string>("");
    const handleSearch = () => {
        setShouldFetch(!shouldFetch);
    };
    const handleCityClick = (city: any) => {
        onCitySelect(city);
        setCurrentCity(city.name);
        setShowModal(false);
    };

    const handleClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const selectedCity: any = localStorage.getItem("selectedCity");

        if (selectedCity) {
            setShowModal(false);
            setCurrentCity(JSON.parse(selectedCity).name || "");
            console.log("Selected city:", selectedCity);
        }
    }, []);

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
                onClick={handleClick}
            >
                <Typography
                    sx={{
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "400",
                        marginRight: "25px",
                    }}
                >
                    {currentCity}
                </Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "400" }}>
                    7 napos előrejelzés
                </Typography>
            </Box>

            <Modal
                sx={{ display: "flex", alignItems: "center" }}
                open={showModal}
            >
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: 400,
                        maxHeight: 500,
                        backgroundColor: "white",
                        padding: 3,
                        width: "100%",
                        position: "relative",
                    }}
                >
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a city"
                    />
                    <Button onClick={handleSearch} disabled={loading}>
                        Search
                    </Button>
                    {loading && <Typography>Loading...</Typography>}
                    <List>
                        {cities.map((city) => (
                            <ListItem
                                key={city.id}
                                onClick={() => handleCityClick(city)}
                            >
                                <Typography
                                    sx={{ fontSize: "12px", color: "black" }}
                                >
                                    {city.name}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </Modal>
        </Box>
    );
};

export default CitySearch;
