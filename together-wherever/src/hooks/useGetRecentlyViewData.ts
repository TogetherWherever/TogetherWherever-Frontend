"use client";

import { fetchRecentlyView } from "@/fetcher/getRecentlyView";
import { useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { RecentlyViewData } from "@/utils/types";

export const useGetRecentlyViewData = () => {
    const [recentlyViewData, setRecentlyViewData] = useState<RecentlyViewData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);

    // Use useCallback to memoize the fetching logic
    const getRecentlyViewData = useCallback(async (token: string) => {
        try {
            const decoded: { sub: string } = jwtDecode(token);
            const res = await fetchRecentlyView(decoded.sub);
            setRecentlyViewData(res);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getRecentlyViewData(token); // Only fetch if token is available
        } else {
            setLoading(false);
        }
    }, [getRecentlyViewData]); // Only re-run when getRecentlyViewData is updated

    return { recentlyViewData, loading, error };
};
