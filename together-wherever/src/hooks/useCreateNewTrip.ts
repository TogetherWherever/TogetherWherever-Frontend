'use client';

import { useState, useEffect } from 'react';
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";

import { CreateNewTripBodyInterface } from "@/utils/types";
import { fetchingUsersData, createNewTrip } from "@/fetcher/create-new-trip";
import { fetchPlaceDetails } from "@/fetcher/get-place-details";

export const useCreateNewTrips = () => {
    const router = useRouter();

    // States
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tripName, setTripName] = useState('');
    const [tripNameLength, setTripNameLength] = useState(0);
    const [companionName, setCompanionName] = useState('');
    const [companionIds, setCompanionIds] = useState<Array<string>>([]);
    const [placeName, setPlaceName] = useState<string | null>(null);
    const [placeId, setPlaceId] = useState<string>();
    const [usersData, setUsersData] = useState<Array<{ userId: string; name: string; profileImage: string; }>>();
    const filteredResults = (usersData || []).filter((item) =>
        item.name.toLowerCase().includes(companionName.toLowerCase())
    );
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);

    // Handlers for form and trip interactions
    const handleChangeTripName = (e: any) => setTripName(e.target.value);
    const handleChangeCompanions = (e: any) => setCompanionName(e.target.value);

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
                owner: 'test',  // Placeholder username (replace with actual user)
                trip_name: tripName,
                dest_id: placeId || "01",  // Use actual placeId
                dest_name: placeName || "Phuket",
                start_date: new Date(range[0].startDate).toISOString().split('T')[0],  // Convert to YYYY-MM-DD
                end_date: new Date(range[0].endDate).toISOString().split('T')[0],      // Convert to YYYY-MM-DD
                duration: Math.ceil((range[0].endDate.getTime() - range[0].startDate.getTime()) / (1000 * 3600 * 24) + 1),
                companion: companionIds.join(','),
            };

            createNewTrip(body);

            // Redirect after creating a new trip
            const res = { message: "Mocked response from creating a new trip.", trip_id: '001' };
            router.push(`/planning/${res.trip_id}`);
        }
    };

    // Fetch users data when the component mounts
    useEffect(() => {
        const getUsersData = async () => {
            try {
                const allUsersData = await fetchingUsersData();
                setUsersData(allUsersData);
            } catch (err) {
                console.error("Error loading voting page data:", err);
                setLoading(false);
            }
        };

        getUsersData();
    }, []);

    // Simulate loading state for 1 second
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    // Check for token in localStorage to enforce login
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    // Trip name length updates
    useEffect(() => {
        setTripNameLength(tripName.length);
    }, [tripName]);

    // Ensure tripName does not exceed 50 characters
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
        handleRemoveCompanion,
        usersData,
        loading,
        setIsOpen,
        isOpen,
        filteredResults
    };
};
