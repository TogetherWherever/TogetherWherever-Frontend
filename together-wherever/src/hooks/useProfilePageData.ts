"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetxhUserProfileData } from "@/fetcher/getUserProfileData";
import { editUserPreferences } from "@/fetcher/editUserPreferences";
import { UserProfileDataType } from "@/utils/types";
import { toast } from "react-toastify";

export const useProfilePageData = () => {
    const { username } = useParams();
    const router = useRouter();
    const decodedUsername = useMemo(() => decodeURIComponent(username as string), [username]);

    const [userProfileData, setUserProfileData] = useState<UserProfileDataType | null>(null);
    const [loading, setLoading] = useState(true);
    const [preferenceData, setPreferenceData] = useState<string[]>([]);
    const [isTheSameAsOriginal, setIsTheSameAsOriginal] = useState(true);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [originalData, setOriginalData] = useState<string[]>();

    // Fetch user profile data and preferences
    useEffect(() => {
        let isMounted = true;

        const fetchProfileData = async () => {
            try {
                const res = await fetxhUserProfileData(decodedUsername);
                if (isMounted) {
                    setUserProfileData(res);
                    setPreferenceData(res.preferences);
                    setOriginalData(res.preferences);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
                if (isMounted) setLoading(false);
            }
        };

        fetchProfileData();
        return () => {
            isMounted = false;
        };
    }, [decodedUsername]);

    // Compare preferences on change
    useEffect(() => {
        if (originalData && preferenceData) {
            // Convert Set to Array for iteration
            const originalArray = Array.from(originalData); // Convert Set to Array
            const preferenceArray = Array.from(preferenceData); // Convert Set to Array

            const isEqual = originalArray.length === preferenceArray.length &&
                originalArray.every(item => preferenceArray.includes(item));

            setIsTheSameAsOriginal(isEqual);
        }
    }, [preferenceData, originalData]);

    // Handle preference change
    const handlePreferenceChange = (pref: string) => {
        setPreferenceData((prev) =>
            prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
        );
    };

    // Handle edit preferences
    const handleClickEditPreferences = async () => {
        if (preferenceData.length < 3) {
            toast.warning("Please select at least 3 preferences.");
            return;
        }

        try {
            const res = await editUserPreferences(decodedUsername, preferenceData);
            if (res === 200) window.location.reload();
        } catch (error) {
            console.error("Error updating preferences:", error);
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("storage"));
        router.push("/");
    };

    const handleResetPreferences = () => {
        if (originalData) {
            setPreferenceData([...originalData]); // Reset preferences to original data
        }
    };

    return {
        userProfileData,
        loading,
        handleLogout,
        preferenceData,
        isTheSameAsOriginal,
        isEditDialogOpen,
        setIsEditDialogOpen,
        isLogoutDialogOpen,
        setIsLogoutDialogOpen,
        handlePreferenceChange,
        handleClickEditPreferences,
        handleResetPreferences
    };
};
