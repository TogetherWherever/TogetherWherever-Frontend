"use client";

import { BaseButton } from "@/components/buttons/BaseButton";
import { useProfilePageData } from "@/hooks/useProfilePageData";
import ProfileCard from "@/components/cards/ProfileCard";
import { preferences } from "@/utils/preferences";
import { formatPreference } from "@/utils/format-preferences";
import DialogBox from "@/components/Dialog";
import ToastNotification from "@/components/ToastNotification";
import { ClipLoader } from "react-spinners";
import clsx from "clsx";
import ErrorReport from "@/components/ErrorReport";

export default function Profile() {
    const {
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
        handleResetPreferences,
        error
    } = useProfilePageData();

    if (loading || userProfileData === null) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <ClipLoader size={50} color={"#60993E"} loading={loading} />
            </div>
        );
    } else if (error) {
        <div className="fixed inset-0 flex items-center justify-center">
            <ErrorReport />
        </div>
    }

    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col gap-6 px-8 py-4 w-full max-w-[1536px]">
                <DialogBox
                    isOpen={isEditDialogOpen}
                    setIsOpen={setIsEditDialogOpen}
                    onConfirm={handleClickEditPreferences}
                    dialogTxt={{
                        topic: "Edit Your Travel Preference(s)",
                        desc: "Please confirm that you want to edit your travel preference(s).",
                    }}
                />
                <DialogBox
                    isOpen={isLogoutDialogOpen}
                    setIsOpen={setIsLogoutDialogOpen}
                    onConfirm={handleLogout}
                    dialogTxt={{
                        topic: "Log Out?",
                        desc: "Please confirm that you want to log out.",
                    }}
                />
                <ToastNotification />
                <ProfileCard
                    username={userProfileData.username}
                    email={userProfileData.email}
                    firstName={userProfileData.firstName}
                    lastName={userProfileData.lastName}
                    preferences={userProfileData.preferences}
                    tripsCount={userProfileData.tripsCount}
                    setIsLogout={setIsLogoutDialogOpen}
                />
                <div className="rounded-3xl bg-white-smoke p-10 lg:pb-20">
                    <label className="text-3xl font-bold"> Travel Preferences </label>
                    <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-2 pt-6">
                        {preferences.map((pref) => (
                            <label
                                key={pref}
                                onClick={() => handlePreferenceChange(pref)}
                                className={`text-center cursor-pointer items-center space-x-2 p-2 rounded-lg ${preferenceData.includes(pref)
                                    ? "bg-asparagus-green text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                            >
                                <span>{formatPreference(pref)}</span>
                            </label>
                        ))}
                    </div>
                    <div className="flex lg:h-0 h-[calc(100vh-880px)] mt-6">
                        <div className="mt-auto lg:mt-0 flex justify-end mt-6 w-full gap-4">
                            <BaseButton
                                buttonTxt="Edit Preferences"
                                className={clsx(
                                    "!text-xl !text-white !py-2 !px-8 !rounded-lg",
                                    isTheSameAsOriginal ? "!bg-gray-200 text-gray-400" : ""
                                )}
                                onClick={() => setIsEditDialogOpen(true)}
                                disabled={isTheSameAsOriginal}
                            />
                            <BaseButton
                                buttonTxt="Reset"
                                className={clsx(
                                    "!text-xl !text-white !py-2 !px-8 !rounded-lg",
                                    isTheSameAsOriginal ? "!bg-gray-200 text-gray-400" : ""
                                )}
                                onClick={handleResetPreferences}
                                disabled={isTheSameAsOriginal}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}