'use client';

import MapView from "@/app/components/Map";
import { ArrowLeftIcon, ArrowRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { BaseButton } from "@/app/components/buttons/BaseButton";
import { ShareIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import TripDayDropDown from './TripDayDropDown';
import { mockTripDetailData } from "./mockTripData";
import ToastNotification from '@/app/components/ToastNotification';
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

type TripDay = {
    day: number;
    status: string;
    voted: boolean;
    voted_dests?: {
        morning: any[];
        afternoon: any[];
        night: any[];
    };
    suitableDests?: any[];
    distance?: any[];
};

export default function Planning() {
    const router = useRouter();
    const showToast = () => {
        toast.error("You aren't allowed to open this until the current vote status is complete.");
    };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Simulate loading for 3 seconds
    }, []);

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');

        if (token) {
        } else {
            router.push('/signin'); // Redirect to login page
        }
    }, [router]);

    const [destDetails] = useState(mockTripDetailData); // using mock data
    const tripDuration = (destDetails.lastDate.getTime() - destDetails.startDate.getTime()) / (1000 * 3600 * 24) + 1;

    const markers = destDetails.trip_day.flatMap(day =>
        day.status === "complete"
            ? Object.values(day.voted_dests || {}).flat()
            : day.suitableDests || []
    ).map(dest => ({
        lat: dest.lat,
        lng: dest.lng,
        name: dest.destName
    }));
    
    const renderTripDayDropDown = (duration: number, startDate: Date, tripDetailData: { trip_day: TripDay[] }) => {
        return Array.from({ length: duration }, (_, index) => {
            const tripDate = addDays(startDate, index);
            const tripDay = tripDetailData?.trip_day?.find(day => day.day === index + 1); // Adjust index for 1-based day

            // If tripDay is not found, return null (or handle accordingly)
            if (!tripDay) {
                return null;
            }

            return <TripDayDropDown key={index} tripDate={tripDate} tripDay={tripDay} showToast={showToast} />;
        });
    };

    return (
        <div className="flex flex-row w-full h-full">
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center">
                    <ClipLoader size={50} color={"#60993E"} loading={loading} />
                </div>
            ) : (
                <>
                    {/* Left Panel: Search and Place Details */}
                    <div className="w-2/3 flex flex-col gap-4">
                        <div className="flex justify-between h-14 items-center pt-5 px-5">
                            <div className="flex w-full h-full items-center gap-2">
                                <ArrowLeftIcon className="h-8 cursor-pointer" onClick={() => router.push("/")} />
                                <Image src="/logo.png" alt="Logo" width={1000} height={1000} className="h-14 w-auto pr-4" />
                            </div>
                            <div className="flex w-full h-full gap-2 items-center justify-end">
                                <label className="text-xl"> Companions: </label>
                                {destDetails.companion.length > 0 && (
                                    <div className="flex items-center">
                                        {destDetails.companion // Find matching users
                                            .slice(0, 4) // Show only the first two
                                            .map((user) => (
                                                <div className="flex flex-col group items-center">
                                                    <div className="w-[40px] h-[40px]">
                                                        <Image
                                                            key={user.username}
                                                            src={user.profilePic}
                                                            alt={user.username}
                                                            width={40}
                                                            height={40}
                                                            objectFit="cover"
                                                            className="rounded-full aspect-square object-cover"
                                                        />
                                                    </div>

                                                    <div
                                                        className="absolute mt-[40px] flex text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {user.username}
                                                    </div>
                                                </div>
                                            ))}
                                        {destDetails.companion.length > 4 && (
                                            <Popover className="relative">
                                                <PopoverButton>
                                                    <div
                                                        className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-300 text-white font-bold text-lg">
                                                        <EllipsisHorizontalIcon className="h-[30px] w-[30px]" />
                                                    </div>
                                                </PopoverButton>
                                                <PopoverPanel
                                                    anchor="bottom"
                                                    transition
                                                    className="
                                                    w-[10%] mt-4 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0
                                                 "
                                                >
                                                    <div className="flex flex-col gap-2">
                                                        {destDetails.companion
                                                            .slice(4)
                                                            .map((user) => (
                                                                <div key={user.username}
                                                                    className="flex justify-between items-center block rounded-lg py-1 px-2 transition">
                                                                    <Image
                                                                        key={user.username}
                                                                        src={user.profilePic}
                                                                        alt={user.username}
                                                                        width={30}
                                                                        height={30}
                                                                        objectFit="cover"
                                                                        className="rounded-full aspect-square object-cover"
                                                                    />
                                                                    <span
                                                                        className="text-black text-base">{user.username}</span>
                                                                </div>
                                                            ))}
                                                    </div>
                                                </PopoverPanel>
                                            </Popover>
                                        )}
                                    </div>
                                )}
                                <BaseButton
                                    buttonTxt="Share"
                                    color=""
                                    className="border !h-[40px] !border-2 border-earth-yellow !text-earth-yellow !px-4 py-2 !gap-3"
                                    leftIcon={ShareIcon}
                                    leftIconCustomization="w-[25px] h-[25px]"
                                    onClick={() => alert("Share")}
                                />
                            </div>
                        </div>
                        <div className="w-full mt-1 h-full">
                            <div
                                className="h-[300px] w-full bg-cover bg-center relative flex flex-col justify-between py-6 pl-4"
                                style={{ backgroundImage: `url(${destDetails.photo})` }}
                            >
                                <label className="text-6xl text-white"> {destDetails.tripName} </label>
                                <div className="flex w-1/3 justify-center bg-black bg-opacity-50 px-2 py-1 rounded-lg">
                                    <label className="text-white text-2xl"> {format(destDetails.startDate, 'MM/dd/yy')} </label>
                                    <ArrowRightIcon className="w-[20px] text-white" />
                                    <label className="text-white text-2xl"> {format(destDetails.lastDate, 'MM/dd/yy')} </label>
                                </div>
                            </div>
                            <div className="w-full pt-12 py-6 pr-12 px-4 flex flex-col gap-6">
                                {renderTripDayDropDown(tripDuration, destDetails.startDate, destDetails)}
                            </div>
                        </div>
                    </div>
                    <ToastNotification />
                    {/* Right Panel: Map View */}
                    <div className="w-1/3">
                        <MapView lat={destDetails.lat} lng={destDetails.lng} makers={markers} />
                    </div>
                </>
            )}

        </div>
    );
}