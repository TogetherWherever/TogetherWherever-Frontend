'use client';

// External Libraries
import { Input, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";
import { ClipLoader } from "react-spinners";

// Internal Imports
import PlaceSearchBox from "@/components/PlaceSearchBox";
import DateRangeInput from '@/components/DateRangeInput';
import { BaseButton } from "@/components/buttons/BaseButton";
import DialogBox from "@/components/Dialog";
import ToastNotification from '@/components/ToastNotification';
import ProfileIcon from "@/components/ProfileIcon";

import { useCreateNewTrips } from "@/hooks/useCreateNewTrip";
import { CREATE_NEW_TRIP_CONFIRMATION_DIALOG } from "@/constants/createNewTripDialog";
import { useEffect, useState } from 'react';

export default function CreateNewTrip() {
    const {
        tripName,
        tripNameLength,
        companionName,
        range,
        setRange,
        handleChangeTripName,
        handleChangeCompanions,
        handleSelectCompanion,
        getPlacesData,
        handleClickStartPlanning,
        companionIds,
        handleRemoveCompanion,
        usersData,
        loading,
        setIsOpen,
        isOpen,
        filteredResults,
        showMaxDateSpan
    } = useCreateNewTrips();

    const [isPageLoaded, setIsPageLoaded] = useState(false);

    // Simulate a delay to show loading spinner (useful for showing spinner during initial loading)
    useEffect(() => {
        setTimeout(() => setIsPageLoaded(true), 1000); // You can adjust the timeout or remove this if not needed
    }, []);

    // If the page is still loading or data is being fetched, show the loader
    if (!isPageLoaded) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <ClipLoader size={50} color={"#60993E"} loading={true} />
            </div>
        );
    }


    return (
        <>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center">
                    <ClipLoader size={50} color={"#60993E"} loading={loading} />
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 p-12">
                    <ToastNotification />
                    <div className="flex justify-center font-bold text-4xl">
                        Plan a Trip
                    </div>
                    <div className="flex w-full max-w-[1100px]">
                        <form onSubmit={handleClickStartPlanning} className="flex flex-col w-full gap-2">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="trip-name" className="text-xl font-bold text-black">
                                    Trip Name <label className='text-red font-normal'> * </label>
                                </label>
                                <Input
                                    id="trip-name"
                                    type="text"
                                    value={tripName}
                                    onChange={handleChangeTripName}
                                    placeholder="e.g., Summer in Phuket w/ my gang"
                                    className={"mt-1 block w-full h-[50px] rounded-xl border-2 border-hurricane bg-transparent py-1.5 px-3 focus:outline-none focus:ring-0"}
                                />
                                <label className='flex justify-end text-base text-hurricane'> {tripNameLength}/50 max characters </label>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="trip-name" className="text-xl font-bold text-black">
                                    Where to? <label className='text-red font-normal'> * </label>
                                </label>
                                <PlaceSearchBox onSelect={getPlacesData} />
                            </div>
                            <div className="flex xl:flex-row flex-col w-full mt-4 gap-4">
                                <div className="flex flex-col gap-2 xl:w-1/2">
                                    <div className="flex items-center">
                                        <label htmlFor="trip-name" className="text-xl font-bold text-black">
                                            Dates <label className='text-red font-normal'> * </label>
                                        </label>
                                        <label className='text-base pl-4'>
                                            Please select a date range (Max: 5 days)
                                        </label>
                                    </div>

                                    <div className="w-full">
                                        <DateRangeInput range={range} setRange={setRange} showMaxDateSpan={showMaxDateSpan} />
                                    </div>
                                </div>
                                <div className="flex flex-col xl:w-1/2 xl:h-full h-[calc(100vh-880px)]">
                                    <label htmlFor="trip-name" className="text-xl font-bold text-black">
                                        Companion
                                    </label>
                                    <div className="flex flex-col mb-6">
                                        <div className="mt-1">
                                            <label className="text-base">Invite companions</label>
                                            <Input
                                                id="companions"
                                                type="text"
                                                value={companionName}
                                                onChange={handleChangeCompanions}
                                                placeholder="Enter username"
                                                className="mt-1 block w-full h-[50px] rounded-xl border-2 border-hurricane bg-transparent py-1.5 px-3 focus:outline-none focus:ring-0"
                                            />
                                            {filteredResults.length > 0 && companionName && (
                                                <div className="absolute mt-2 w-[545px] bg-white border border-gray-300 rounded-xl shadow-md z-10 max-h-60 overflow-y-auto">
                                                    <ul className="divide-y divide-gray-200">
                                                        {filteredResults.map((item: { userId: string; name: string }) => (
                                                            <li
                                                                key={item.userId}
                                                                onClick={() => handleSelectCompanion(item)}
                                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg transition duration-200"
                                                            >
                                                                {item.name}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {companionIds.length > 0 && (
                                                <div className="flex items-center mt-2 gap-6">
                                                    {(usersData ?? [])
                                                        .filter((user) => companionIds.includes(user.userId)) // Find matching users
                                                        .slice(0, 2) // Show only the first two
                                                        .map((user) => (
                                                            <div
                                                                key={user.userId}
                                                                onClick={() => handleRemoveCompanion(user.name)}
                                                                className="cursor-pointer relative group"
                                                            >
                                                                <div
                                                                    className="w-[50px] h-[50px] absolute flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    onClick={() => handleRemoveCompanion(user.userId)}
                                                                >
                                                                    <TrashIcon className="w-[25px] text-white" />
                                                                </div>

                                                                <div className="w-[50px] h-[50px]">
                                                                    <ProfileIcon username={user.name} width={50} height={50} />
                                                                </div>
                                                                <div className="flex w-full justify-center itmes-center absolute left-0 right-0 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    {user.name}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    {(usersData ?? []).filter((user) => companionIds.includes(user.userId)).length > 2 && (
                                                        <Popover className="relative">
                                                            <PopoverButton>
                                                                <div className="w-[50px] h-[50px] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-lg">
                                                                    +{(usersData ?? []).filter((user) => companionIds.includes(user.userId)).length - 2}
                                                                </div>
                                                            </PopoverButton>
                                                            <PopoverPanel
                                                                anchor="bottom"
                                                                transition
                                                                className="w-[10%] mt-4 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                                                            >
                                                                <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                                                                <div className="flex flex-col gap-2">
                                                                    {(usersData ?? [])
                                                                        .filter((user) => companionIds.includes(user.userId))
                                                                        .slice(2)
                                                                        .map((user) => (
                                                                            <div key={user.userId} className="flex justify-between items-center block rounded-lg py-1 px-2 transition">
                                                                                <span className="text-black">{user.name}</span>
                                                                                <TrashIcon
                                                                                    className='w-5 h-5 cursor-pointer'
                                                                                    onClick={() => handleRemoveCompanion(user.userId)}
                                                                                />
                                                                            </div>
                                                                        ))}
                                                                </div>
                                                            </PopoverPanel>
                                                        </Popover>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-auto flex justify-end w-full pb-4">
                                        <BaseButton
                                            buttonTxt="Start Planning"
                                            onClick={() => setIsOpen(true)}
                                            className="!px-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <DialogBox
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        onConfirm={handleClickStartPlanning}
                        dialogTxt={CREATE_NEW_TRIP_CONFIRMATION_DIALOG}
                    />
                </div>
            )}
        </>

    );
}
