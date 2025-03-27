"use client";

import { fetchRecentlyView } from "@/fetcher/getRecentlyView";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { RecentlyViewData } from "@/utils/types";

export const useGetRecentlyViewData = () => {
    const [recentlyViewData, setRecentlyViewData] = useState<RecentlyViewData[] | undefined>(undefined);

    useEffect(() => {
        const getRecentlyViewData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const decoded: { sub: string } = jwtDecode(token);
                    const res = await fetchRecentlyView(decoded.sub);
                    setRecentlyViewData(res);
                }
            } catch (error) {
                console.error("Error fetching recently viewed trips:", error);
            }
        };

        getRecentlyViewData(); // ✅ Call the function here
    }, []); // ✅ Empty dependency array to run only once on mount

    return recentlyViewData;
};
