'use client';

import { fetchGetYourTripsData } from "@/fetcher/getYourTripData";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { YourTripDara } from "@/utils/types";
import { usePathname, useRouter } from "next/navigation";

export const useYourTripData = () => {
    const [yoryTripData, setYourTripData] = useState<YourTripDara[] | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathName = usePathname();
    
    const handleNavigateTripPlanningPage = () => {
        router.push(`${pathName}/create-new-trip`)
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login"); // Redirect to login page if no token is found
        }
    }, [router]);


    useEffect(() => {
        const getYourTripData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const decoded: { sub: string } = jwtDecode(token);
                    const res = await fetchGetYourTripsData(decoded.sub);
                    setYourTripData(res);
                }
            } catch (error) {
                console.error("Error fetching recently viewed trips:", error);
            } finally {
                setLoading(false);

            }
        };
        getYourTripData();
    }, []);

    return {
        yoryTripData,
        router,
        handleNavigateTripPlanningPage,
        loading
    };
};
