'use client';

import { useState, useCallback } from "react";
import { PlaceDetails } from "@/utils/types";
import { DEFAULT_CENTER } from "@/constants/defaultCenter";
import { fetchPlaceDetails } from "@/fetcher/getPlaceDetails";

export const useBaseDiscoverPage = () => {
    const [selectedPlace, setSelectedPlace] = useState(DEFAULT_CENTER);
    const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
    const [loading, setLoading] = useState(false); // Loading state to manage async status
    const [isRequestInProgress, setIsRequestInProgress] = useState(false);

    // Helper function to format strings
    const formatString = (str: string) => {
        return str
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
    };

    // Memoized fetch function to avoid re-creation on each render
    const getDiscoverPageDetails = useCallback(async (placeId: string) => {
        setLoading(true);
        setPlaceDetails(null);

        if (isRequestInProgress) return;
        setIsRequestInProgress(true);

        const cachedData = localStorage.getItem(placeId);
        if (cachedData) {
            // If data exists in cache, use it
            const cachedPlace = JSON.parse(cachedData);
            setPlaceDetails(cachedPlace);
            setSelectedPlace({ lat: cachedPlace.lat ?? DEFAULT_CENTER.lat, lng: cachedPlace.lon ?? DEFAULT_CENTER.lng });
            setIsRequestInProgress(false);
            setLoading(false);
            return;
        }

        try {
            const data = await fetchPlaceDetails(placeId);

            // Save the data to localStorage for future use
            localStorage.setItem(placeId, JSON.stringify(data));

            // Update place details and selected place state
            const lat = data.lat ?? DEFAULT_CENTER.lat;
            const lng = data.lon ?? DEFAULT_CENTER.lng;
            setPlaceDetails(data); // Ensure the new data is updated
            setSelectedPlace({ lat, lng });
        } catch (error) {
            console.log(error);
        } finally {
            setIsRequestInProgress(false); // Reset the request in progress flag
            setLoading(false); // Hide loading spinner
        }
    }, [isRequestInProgress]);

    return {
        selectedPlace,
        placeDetails,
        formatString,
        getDiscoverPageDetails,
        loading, // Return the loading state so UI can show loading indicator
    };
};
