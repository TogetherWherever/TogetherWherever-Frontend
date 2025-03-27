'use client';

import { BaseButton } from "@/components/buttons/BaseButton";
import { useProfilePageData } from "@/hooks/useProfilePageData";
import ProfileCard from "@/components/cards/ProfileCard";
import { preferences } from "@/utils/preferences";
import { formatPreference } from "@/utils/format-preferences";
import { useEffect, useState } from "react"
import DialogBox from "@/components/Dialog";
import { editUserPreferences } from "@/fetcher/editUserPreferences";
import ToastNotification from '@/components/ToastNotification';
import { toast } from "react-toastify";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";

export default function Profile() {
    const CREATE_NEW_TRIP_CONFIRMATION_DIALOG = {
        topic: "Edit Your Travel Preference(s)",
        desc: "Please confirm that you want to edit you travel preference(s)."
    };

    const LOG_OUT = {
        topic: "Log Out?",
        desc: "Please confirm that you want to log out."
    };

    const showChooseLessthanMinimum = () => {
        toast.warning("Please select at least 3 preferences.");
    };

    const {
        userProfileData,
        loading,
        handleLogout,
        decodedUsername,
    } = useProfilePageData();

    const [preferenceData, setPreferenceData] = useState<{ preferences: string[] }>({ preferences: [] });
    const [isOpen, setIsOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isTheSameAsOriginal, setIsTheSameAsOriginal] = useState<boolean>();

    useEffect(() => {
        if (userProfileData?.preferences) {
            setPreferenceData({ preferences: userProfileData.preferences });
        }
    }, [userProfileData]);

    useEffect(() => {
        if (JSON.stringify(userProfileData?.preferences) === JSON.stringify(preferenceData.preferences)) {
            setIsTheSameAsOriginal(true);
        } else {
            setIsTheSameAsOriginal(false);
        }
    }, [preferenceData, userProfileData?.preferences]);

    const handlePreferenceChange = (pref: string) => {
        setPreferenceData((prev) => ({
            ...prev,
            preferences: prev.preferences.includes(pref)
                ? prev.preferences.filter((p) => p !== pref)
                : [...prev.preferences, pref]
        }));
    };

    const handleClickEditPreferences = async () => {
        try {
            if (preferenceData.preferences.length <= 3) {
                showChooseLessthanMinimum()
            } else {
                const res = await editUserPreferences(decodedUsername, preferenceData.preferences);
                if (res === 200) {
                    window.location.reload();
                }
            }
        } catch (error) {
            throw error;
        }
    };

    if (loading || userProfileData === null) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <ClipLoader size={50} color={"#60993E"} loading={loading} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-[150px] py-[50px]">
            <DialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onConfirm={handleClickEditPreferences}
                dialogTxt={CREATE_NEW_TRIP_CONFIRMATION_DIALOG}
            />
            <DialogBox
                isOpen={isLogout}
                setIsOpen={setIsLogout}
                onConfirm={handleLogout}
                dialogTxt={LOG_OUT}
            />
            <ToastNotification />
            <ProfileCard
                username={userProfileData?.username}
                email={userProfileData?.email}
                firstName={userProfileData?.firstName}
                lastName={userProfileData?.lastName}
                preferences={userProfileData?.preferences}
                tripsCount={userProfileData?.tripsCount}
                setIsLogout={setIsLogout}
            />
            <div className="rounded-3xl bg-white-smoke p-10">
                <label className="text-3xl font-bold"> Travel Preferences </label>
                <div className="grid grid-cols-5 gap-2 pt-6">
                    {preferences.map((pref) => (
                        <label
                            key={pref}
                            onClick={() => handlePreferenceChange(pref)} // Handle toggle on click
                            className={`text-center cursor-pointer items-center space-x-2 p-2 rounded-lg ${preferenceData.preferences.includes(pref)
                                ? "bg-asparagus-green text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            <span>{formatPreference(pref)}</span>
                        </label>
                    ))}
                </div>
                <div className="flex justify-end mt-6 w-full ">
                    <BaseButton
                        buttonTxt="Edit Preferences"
                        className={clsx('!text-xl !text-white !py-2 !px-8 !rounded-lg', isTheSameAsOriginal ? "!bg-gray-200 text-gray-400" : "")}
                        onClick={() => setIsOpen(true)}
                        disabled={isTheSameAsOriginal}
                    />
                </div>

            </div>
        </div>
    );
}