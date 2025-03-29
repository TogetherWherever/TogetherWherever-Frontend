"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { fetchTripDetail } from "@/fetcher/getTripDetails";
import { recordRecentlyView } from "@/fetcher/recordRecentlyView";
import { TripDetail } from "@/utils/types";
import { jwtDecode } from "jwt-decode";
import { MarkerDestination } from "@/utils/types"

export const usePlanningPageDetails = () => {
    const router = useRouter();
    const params = useParams();
    const [details, setDetails] = useState<TripDetail | undefined>(); // using mock data
    const [loading, setLoading] = useState(true);
    const [marker, setMarker] = useState<MarkerDestination[]>([]);

    // Redirect to login if no token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    // Fetch trip details when the tripId changes
    useEffect(() => {
        const getTripDetails = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token);
                    const tripDetails = await fetchTripDetail(params.tripId, decoded.sub);
                    await recordRecentlyView({
                        username: decoded.sub,
                        view_trip_id: Number(params.tripId)
                    });
                    setDetails(tripDetails);
                    // setMarker([{ lat: tripDetails.lat, lng: tripDetails.lon }])
                }
            } catch (error) {
                console.error(error); // Log error instead of throwing
            } finally {
                setLoading(false);
            }
        };

        getTripDetails();
    }, [params.tripId]);

    // Calculate trip duration (memoized)
    const tripDuration = useMemo(() => {
        if (details) {
            return (new Date(details.lastDate).getTime() - new Date(details.startDate).getTime()) / (1000 * 3600 * 24) + 1;
        }
        return 0;
    }, [details]);

    // Toast messages
    const showToast = () => toast.error("You aren't allowed to open this until the current vote status is complete.");
    const showWrongOrder = () => toast.error("This location is not open during the selected period.");

    return {
        router,
        loading,
        tripDuration,
        showToast,
        showWrongOrder,
        details,
        marker,
        setMarker
    };
};
