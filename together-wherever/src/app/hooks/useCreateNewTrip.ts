'use client';

import {useState, useEffect} from 'react';
import {addDays} from "date-fns";
import {CreateNewTripBodyInterface, PlaceDetails} from "@/app/types";
import {createNewTrip} from "@/app/fetcher/create-new-trip";
import {useRouter} from "next/navigation";
import axios from "axios";

// const tripMockData = {};

export const useCreateNewTrips = () => {
    const [tripName, setTripName] = useState('');
    const [tripNameLength, setTripNameLength] = useState(0);
    const [companionName, setCompanionName] = useState('');
    const [companionIds, setCompanionIds] = useState<Array<string>>([]);
    const [placeName, setPlaceName] = useState<string | null>(null);
    const [placeId, setPlaceId] = useState<string>();
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    const router = useRouter();

    const fetchPlaceDetails = async (placeId: string) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/discover-place-details/?dest_id=${placeId}`);
            const data = res.data as PlaceDetails;

            console.log("Fetched Place Data:", data);

            setPlaceName(data.destName);
            setPlaceId(data.destID)
        } catch (error) {
            console.error("Failed to fetch place details", error);
        }
    };

    const handleChangeTripName = (e: any) => {
        setTripName(e.target.value);
    };

    const handleChangeCompanions = (e: any) => {
        setCompanionName(e.target.value);
    };

    const handleSelectCompanion = (item: any) => {
        setCompanionIds((prev) => {
            if (!prev.includes(item.userId)) {
                return [...prev, item.userId];
            }
            return prev;
        });
        setCompanionName('');
    };

    const handleRemoveCompanion = (userId: string) => {
        setCompanionIds((prevIds) => prevIds.filter((id) => id !== userId));
    };

    const handleClickStartPlanning = () => {
        if (tripName !== '' && placeId !== '' && placeName !== '') {
            const body: CreateNewTripBodyInterface = {
                owner: 'test',  // username (replace with actual user)
                trip_name: tripName,
                dest_id: placeId || "01", // Use actual placeId
                dest_name: placeName || "Phuket",
                start_date: new Date(range[0].startDate).toISOString().split('T')[0], // Convert to YYYY-MM-DD
                end_date: new Date(range[0].endDate).toISOString().split('T')[0],     // Convert to YYYY-MM-DD
                duration: Math.ceil(
                    (range[0].endDate.getTime() - range[0].startDate.getTime()) / (1000 * 3600 * 24) + 1
                ),
                companion: companionIds.join(','), // Comma-separated companion IDs
            };

            createNewTrip(body);
        }

        const res = {message: "Mocked response from creating a new trip.", trip_id: '001'};

        router.push(`/planning/${res.trip_id}`);
    };

    useEffect(() => {
        setTripNameLength(tripName.length);
    }, [tripName]);

    useEffect(() => {
        if (tripName.length > 50) {
            setTripName(tripName.slice(0, 50));
        }
    }, [tripName]);

    return {
        tripName,
        tripNameLength,
        setTripName,
        companionName,
        setCompanionName,
        companionIds,
        setCompanionIds,
        placeName,
        placeId,
        range,
        setRange,
        handleChangeTripName,
        handleChangeCompanions,
        handleSelectCompanion,
        fetchPlaceDetails,
        handleClickStartPlanning,
        handleRemoveCompanion
    };
};