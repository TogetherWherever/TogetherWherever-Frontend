"use client";

import { useMemo, useState, useEffect } from "react";
import { useGetRecentlyViewData } from "@/hooks/useGetRecentlyViewData";

export const useHomePageData = () => {
    const { recentlyViewData, loading } = useGetRecentlyViewData();
    const [token, setToken] = useState<string | null>(null);

    // Fetch token from localStorage only in the client-side (useEffect ensures this)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, []); // Only run once when component mounts

    return { recentlyViewData, loading, token };
};
