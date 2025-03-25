"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined); // Set to undefined initially for loading state
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // Check if the token exists and set authentication state
        if (!token) {
            setIsAuthenticated(false);
            router.replace("/signin"); // Redirect to signin if no token
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    return isAuthenticated;
}