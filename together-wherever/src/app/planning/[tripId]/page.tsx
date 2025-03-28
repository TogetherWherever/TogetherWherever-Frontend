'use client';

import { ArrowLeftIcon, ArrowRightIcon, EllipsisHorizontalIcon, ShareIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { addDays, format } from "date-fns";
import { ClipLoader } from "react-spinners";

import MapView from "@/components/Map";
import { BaseButton } from "@/components/buttons/BaseButton";
import TripDayDropDown from '@/components/TripDayDropDown';
import ToastNotification from '@/components/ToastNotification';

import { useTripDetails } from "@/hooks/usePlanningPageDetails";
import { TripDay } from "@/utils/types";

export default function Planning() {
    const {
        router,
        loading,
        tripDuration,
        markers,
        showToast,
        showWrongOrder,
        details,
    } = useTripDetails()

    const renderTripDayDropDown = (duration: number, startDate: Date, tripDetailData: { trip_day: TripDay[] }) => {
        return Array.from({ length: duration }, (_, index) => {
            const tripDate = addDays(startDate, index);
            const tripDay = tripDetailData?.trip_day?.find(day => day.day === index + 1); // Adjust index for 1-based day

            // If tripDay is not found, return null (or handle accordingly)
            if (!tripDay) {
                return null;
            }

            return <TripDayDropDown
                key={index}
                tripDate={tripDate}
                tripDay={tripDay}
                showToast={showToast}
                showWrongOrder={showWrongOrder}
            />;
        });
    };

    if (loading || !details) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <ClipLoader size={50} color={"#60993E"} loading={loading} />
            </div>
        );
    }

    return (
        <>
            {details ? (<>
                <div className="flex flex-row w-full h-full">
                    {/* Left Panel: Search and Place Details */}
                    <div className="w-2/3 flex flex-col gap-4">
                        <div className="flex justify-between h-14 items-center pt-5 px-5">
                            <div className="flex w-full h-full items-center gap-2">
                                <ArrowLeftIcon className="h-8 cursor-pointer" onClick={() => router.push("/")} />
                                <Image src="/logo.png" alt="Logo" width={1000} height={1000} className="h-14 w-auto pr-4" />
                            </div>
                            <div className="flex w-full h-full gap-2 items-center justify-end">
                                <label className="text-xl"> Companions: </label>
                                {details.companion.length > 0 && (
                                    <div className="flex items-center">
                                        {details.companion.slice(0, 4).map((user) => (
                                            <div className="flex flex-col group items-center" key={user.username}>
                                                <div className="w-[40px] h-[40px]">
                                                    {/* mock */}
                                                    <Image
                                                        src={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"}
                                                        alt={user.username}
                                                        width={40}
                                                        height={40}
                                                        objectFit="cover"
                                                        className="rounded-full aspect-square object-cover"
                                                    />
                                                </div>

                                                <div className="absolute mt-[40px] flex text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {user.username}
                                                </div>
                                            </div>
                                        ))}
                                        {details.companion.length > 4 && (
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
                                                        {details.companion.slice(4).map((user) => (
                                                            <div key={user.username}
                                                                className="flex justify-between items-center block rounded-lg py-1 px-2 transition">
                                                                {/* mock */}
                                                                <Image
                                                                    src={"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"}
                                                                    alt={user.username}
                                                                    width={30}
                                                                    height={30}
                                                                    objectFit="cover"
                                                                    className="rounded-full aspect-square object-cover"
                                                                />
                                                                <span className="text-black text-base">{user.username}</span>
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
                            >
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <Image
                                        src={details.photo}
                                        alt="Background"
                                        layout="fill"
                                        objectFit="cover"
                                        quality={75}
                                    />
                                </div>
                                <div className="z-10 h-full flex flex-col justify-between">
                                    <label className="text-6xl text-white"> {details.tripName} </label>
                                    <div className="flex w-1/3 justify-center bg-black bg-opacity-50 px-2 py-1 rounded-lg">
                                        <label className="text-white text-2xl"> {format(details.startDate, 'MM/dd/yy')} </label>
                                        <ArrowRightIcon className="w-[20px] text-white" />
                                        <label className="text-white text-2xl"> {format(details.lastDate, 'MM/dd/yy')} </label>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full pt-12 py-6 pt-4 pr-12 px-4 flex flex-col gap-6">
                                {renderTripDayDropDown(tripDuration, details.startDate, details)}
                            </div>
                        </div>
                    </div>
                    <ToastNotification />
                    {/* Right Panel: Map View */}
                    <div className="w-1/3">
                        <MapView lat={details.lat} lng={details.lon} makers={markers} />
                    </div>
                </div>
            </>) : (
                <div className="flex justify-center items-center text-center text-gray-500">Loading...</div>
            )}
        </>
    );
}
