'use client';

import { useState, useEffect } from 'react';
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import { jwtDecode } from 'jwt-decode';

import { CreateNewTripBodyInterface } from "@/utils/types";
import { fetchingUsersData, createNewTrip } from "@/fetcher/createNewTrip";
import { fetchPlaceDetails } from "@/fetcher/getPlaceDetails";

export const useCreateNewTrips = () => {
    const router = useRouter();

    // States
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const [tripName, setTripName] = useState('');
    const [tripNameLength, setTripNameLength] = useState(0);

    const [companionName, setCompanionName] = useState('');
    const [companionIds, setCompanionIds] = useState<Array<string>>([]);

    const [placeName, setPlaceName] = useState<string | undefined>();
    const [placeId, setPlaceId] = useState<string>();

    const [lat, setLat] = useState<number>();
    const [lon, setLon] = useState<number>();

    const [ownerName, setOwnerName] = useState<string | undefined>();
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

    const formatDateToLocal = (date: Date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-'); // Convert to "YYYY-MM-DD"
    };

    const getDuration = (startDate: Date, endDate: Date) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const timeDifference = end.getTime() - start.getTime();

        const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));

        return daysDifference
    };

    const getPlacesData = async (placeId: string) => {
        try {
            const data = await fetchPlaceDetails(placeId);

            setPlaceName(data.destName);
            setPlaceId(data.destID);
            setLat(data.lat);
            setLon(data.lon);            
        } catch (error) {
            throw error;
        }    
    };

    const handleClickStartPlanning = async () => {
        if (tripName !== '' && placeId !== '' && placeName !== '') {
            const { startDate, endDate } = range[0];
            const body: CreateNewTripBodyInterface = {
                owner: ownerName,
                trip_name: tripName,
                dest_id: placeId ?? "01",  // Mock
                dest_name: placeName ?? "Phuket", // Mock
                lat: lat ?? 0, // Mock
                lon: lon ?? 0, // Mock
                start_date: formatDateToLocal(startDate),
                end_date: formatDateToLocal(endDate),
                duration: getDuration(startDate, endDate),
                companion: companionIds.join(','),
            };

            try {
                const res = await createNewTrip(body);
                router.push(`/planning/${res.trip_id}`);
            } catch (error: any) {
                throw new Error(error.message)
            }
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setOwnerName(decoded.sub);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

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
        getPlacesData,
        handleClickStartPlanning,
        handleRemoveCompanion,
        usersData,
        loading,
        setIsOpen,
        isOpen,
        filteredResults
    };
};
