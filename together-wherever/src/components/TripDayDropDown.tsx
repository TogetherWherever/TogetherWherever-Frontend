'use client';

import { ChevronDownIcon, ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import DestCard from "@/components/cards/DestCard";
import clsx from "clsx";
import { BaseButton } from "@/components/buttons/BaseButton";
import { jwtDecode } from 'jwt-decode';

interface TripDateDropdownPropsInterface {
    key: any;
    tripDate: Date;
    tripDay: any;
    showToast: () => void;
    showWrongOrder?: () => void;
};

export default function TripDayDropDown({ key, tripDate, tripDay, showToast, showWrongOrder }: TripDateDropdownPropsInterface) {
    const formattedDate = format(tripDate, "EEEE, MMMM dd");
    const [showDestination, setShowDestination] = useState<boolean>(false);
    const [orderedDestinations, setOrderedDestinations] = useState(tripDay.voted_dests);
    const router = useRouter();
    const { tripId } = useParams();

    const numOfAvailableDest = tripDay.status === "complete"
        ? tripDay.voted_dests?.length
        : tripDay.suitableDests?.length || 0;

    // Function to toggle showing destinations
    const showContent = () => {
        if (tripDay.status === "pending") {
            setShowDestination(false);
            showToast();
        } else {
            setShowDestination(prevState => !prevState); // Toggle state
        }
    };

    const navigateToVotingPage = (day: string) => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            const userName = decoded.sub;  // Assuming 'sub' is now the username
            if (tripId && userName) {
                router.push(`/planning/${tripId}/vote/${userName}?day=${day}`);
            } else {
                console.error("Trip ID or User Name is missing");
            }
        }
    };

    return (
        <div className="flex flex-col bg-transparent w-full">
            {/* Clickable Icon for toggling */}
            <div
                onClick={showContent} // Fix: Call the function to toggle state
                className="flex items-center gap-4"
            >
                {showDestination ? (
                    <ChevronDownIcon className="w-12 h-12 cursor-pointer" />
                ) : (
                    <ChevronRightIcon className="w-12 h-12 cursor-pointer" />
                )}

                {/* Trip Information */}
                <div className="flex flex-col w-full cursor-pointer">
                    <div className="flex items-center cursor-pointer justify-between">
                        <label className="text-4xl cursor-pointer"> {formattedDate} </label>
                        {tripDay.status === "complete" && (
                            <div className="rounded-full border-2 pl-4 pr-4 border-black">
                                <label className="text-2xl font-bold"> Finalized </label>
                            </div>
                        )}
                        {tripDay.status === "voting" && (
                            <div className="flex justify-center items-center gap-4">
                                <div className="text-xl"> Total vote: {tripDay.members_voted} / {tripDay.total_members}, </div>
                                <BaseButton
                                    buttonTxt={tripDay.user_voted ? "Voted" : "Vote"}
                                    className={clsx("text-sm", tripDay.user_voted ? "!bg-gray-200 text-gray-400" : "")}
                                    leftIconCustomization="w-[15px] h-[15px]"
                                    onClick={(event: any) => {
                                        event.stopPropagation(); // Prevents triggering showContent
                                        navigateToVotingPage(tripDay.day);
                                    }}
                                    disabled={tripDay.user_voted}
                                />
                            </div>
                        )}
                    </div>
                    <div className={clsx("border-b-2 border-black/50 w-full cursor-pointer", tripDay.status === "pending" ? "pb-6" : "pb-4")}>
                        {(tripDay.status === "complete" || tripDay.status === "voting") && (
                            <label className="">
                                {numOfAvailableDest} Places Available
                            </label>
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ${showDestination ? "h-auto" : "h-0"}`}
            >
                <div className={clsx(
                    "flex border-b-2 border-black/50 ml-16 pb-4 pt-2",
                    tripDay.status === "complete" ? "flex-col justify-center overflow-y-auto" : "items-center overflow-x-auto pb-4"
                )}>
                    {tripDay.status === "complete" && tripDay.voted_dests?.map((dest: any, index: number) => {
                        const distanceInfo = tripDay.distance.find((d: any, distanceIndex: number) => {
                            return d.fromID === dest.destID && index === distanceIndex;
                        });

                        return (
                            <div key={dest.destID} className="rounded-lg p-2 pt-0 pb-0 pr-4">
                                <div className="flex flex-col justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col h-full">
                                            <MapPinIcon width={40} height={40} fill="red" />
                                            {distanceInfo && (
                                                <div className="flex flex-col items-center justify-center w-[40px] text-center pl-[1px]">
                                                    <div className="w-[2px] h-7 bg-black"></div>
                                                    <p className="py-2">
                                                        {distanceInfo.distance_km < 1 ? (
                                                            <>
                                                                {distanceInfo.distance_km * 1000} m
                                                            </>
                                                        ) : (
                                                            <>
                                                                {distanceInfo.distance_km} km
                                                            </>
                                                        )}
                                                    </p>
                                                    <div className="w-[2px] h-7 bg-black"></div>
                                                </div>
                                            )}
                                            {!distanceInfo && (
                                                <div className="flex flex-col justify-center items-center">
                                                    <div className="w-[2px] h-11 bg-transparent"></div>
                                                    <p className="text-lg text-transparent h-7 py-2"> </p>
                                                    <div className="w-[2px] h-11 bg-transparent"></div>
                                                </div>
                                            )}
                                        </div>
                                        <DestCard
                                            key={dest.destID}
                                            tripDay={tripDay.day}
                                            destData={dest}
                                            complete={true}
                                            orderedDestinations={tripDay.voted_dests}
                                            setOrderedDestinations={setOrderedDestinations}
                                            showWrongOrder={showWrongOrder}
                                            tripDate={tripDate}
                                            tripId={tripId}
                                            index={index}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {tripDay.status === "voting" && (
                        <div className="flex items-center gap-8 min-w-max">
                            {tripDay.suitableDests.map((dest: any) => (
                                <DestCard key={dest.destID} destData={dest} tripDate={tripDate} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
