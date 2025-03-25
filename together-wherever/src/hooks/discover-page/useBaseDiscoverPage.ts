'use client';

import { useState } from "react";

import { PlaceDetails } from "@/utils/types";
import { DEFAULT_CENTER } from "@/constants/defaultCenter";
import { fetchPlaceDetails } from "@/fetcher/getPlaceDetails";

export const useBaseDiscoverPage = () => {
    const [selectedPlace, setSelectedPlace] = useState(DEFAULT_CENTER);
    const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);

    // Helper function to format strings
    const formatString = (str: string) => {
        return str
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
    };

    const getDiscoverPageDetails = async (placeId: string) => {
        try {
            const data = await fetchPlaceDetails(placeId);

            console.log("Fetched Place Data:", data);

            const lat = data.lat ?? DEFAULT_CENTER.lat;
            const lng = data.lon ?? DEFAULT_CENTER.lng;

            setPlaceDetails(data);
            setSelectedPlace({ lat, lng });
        } catch (error) {
            console.log(error);
        }        
    };

    return {
        selectedPlace,
        placeDetails,
        formatString,
        getDiscoverPageDetails,
    };
};