'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { fetchTripDetail } from "@/fetcher/getTripDetails";
import { TripDetail } from "@/utils/types";

export const useTripDetails = () => {
    const router = useRouter();
    const params = useParams();
    const [details, setDetails] = useState<TripDetail | undefined>(); // using mock data
    const [loading, setLoading] = useState(true);

    // Calculate trip duration, with a safety check for details
    const tripDuration =
        details ? (details.lastDate.getTime() - details.startDate.getTime()) / (1000 * 3600 * 24) + 1 : 0;

    // Create markers for map, with a safety check for details
    const markers = details
        ? details.trip_day.flatMap((day) =>
              day.status === "complete"
                  ? Object.values(day.voted_dests || {}).flat()
                  : day.suitableDests || []
          ).map((dest) => ({
              lat: dest.lat,
              lng: dest.lng,
              name: dest.destName,
          }))
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
                const tripDetails = await fetchTripDetail(params.tripId);
                setDetails(tripDetails);
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
    };
};
