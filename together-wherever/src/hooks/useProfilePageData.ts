'use client';

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetxhUserProfileData } from "@/fetcher/getUserProfileData";
import { useParams, useRouter } from "next/navigation";
import { UserProfileDataType } from "@/utils/types";

export const useProfilePageData = () => {
    const [userProfileData, setUserProfileData] = useState<UserProfileDataType | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event("storage"));
        router.push('/');
    };

    const { username } = useParams();
    const decodedUsername = decodeURIComponent(username as string);    

    useEffect(() => {
        const getYourTripData = async () => {
            setLoading(true);
            try {
                const res = await fetxhUserProfileData(decodedUsername);
                setUserProfileData(res);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching recently viewed trips:", error);
                setLoading(false);
            }
        };
        getYourTripData();
    }, []);

    return {
        userProfileData,
        loading,
        handleLogout,
        decodedUsername,
        router
    };
};