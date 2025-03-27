'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { fetchTripDetail } from "@/fetcher/getTripDetails";
import { recordRecentlyView } from "@/fetcher/recordRecentlyView";
import { TripDetail } from "@/utils/types";
import { jwtDecode } from "jwt-decode";

type Destination = { lat: number; lon: number; destName: string };

export const usePlanningPageDetails = () => {
    const router = useRouter();
    const params = useParams();
    const [details, setDetails] = useState<TripDetail | undefined>(); // using mock data
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState<string>();

    // Calculate trip duration, with a safety check for details
    const tripDuration = details ? (new Date(details.lastDate).getTime() - new Date(details.startDate).getTime()) / (1000 * 3600 * 24) + 1 : 0; // Difference in milliseconds

    // Create markers for map, with a safety check for details
    const markers = details
        ? details.trip_day.reduce<{
            indexedDestinations: { lat: number; lng: number; name: string, status: string }[];
            counter: number;
            uniqueCoords: Map<string, boolean>;
        }>(
            (acc, day) => {
                if (day.status === "complete") {
                    Object.values(day.voted_dests || {}).flat().forEach((dest: Destination) => {
                        const key = `${dest.lat},${dest.lon}`;
                        if (!acc.uniqueCoords.has(key)) {
                            acc.uniqueCoords.set(key, true);
                            acc.indexedDestinations.push({
                                lat: dest.lat,
                                lng: dest.lon,
                                name: `(${acc.counter++}) ${dest.destName}`,
                                status: "complete"
                            });
                        }
                    });
                } else {
                    (day.suitableDests || []).forEach((dest: Destination) => {
                        const key = `${dest.lat},${dest.lon}`;
                        if (!acc.uniqueCoords.has(key)) {
                            acc.uniqueCoords.set(key, true);
                            acc.indexedDestinations.push({
                                lat: dest.lat,
                                lng: dest.lon,
                                name: dest.destName,
                                status: "voting"
                            });
                        }
                    });
                }
                return acc;
            },
            { indexedDestinations: [], counter: 1, uniqueCoords: new Map() }
        ).indexedDestinations
        : [];

    // Toast messages
    const showToast = () => {
        toast.error("You aren't allowed to open this until the current vote status is complete.");
    };

    const showWrongOrder = () => {
        toast.error("This location is not open during the selected period.");
    };

    // Simulate loading and check if token exists in localStorage
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login"); // Redirect to login page if no token is found
        }
    }, [router]);

    useEffect(() => {
        const getTripDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    setUserName(decoded.sub);
                    const tripDetails = await fetchTripDetail(params.tripId, decoded.sub);
                    await recordRecentlyView({
                        username: decoded.sub,
                        view_trip_id: Number(params.tripId)    
                    });
                    setDetails(tripDetails);
                }
            } catch (error) {
                throw error
            }
        };

        getTripDetails();
    }, [params.tripId]);

    return {
        router,
        loading,
        tripDuration,
        markers,
        showToast,
        showWrongOrder,
        details,
        userName
    };
};
