'use client';

import { ChevronDownIcon, ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { format } from "date-fns";
import DestCard from "@/components/cards/DestCard";
import clsx from "clsx";
import { BaseButton } from "@/components/buttons/BaseButton";
import { jwtDecode } from 'jwt-decode';
import { TripDateDropdownPropsInterface } from "@/utils/types"
import { ClipLoader } from "react-spinners";

const TripDayDropDown = ({ key, tripDate, tripDay, showToast, showWrongOrder, setMarker, selectedDay, setSelectedDay }: TripDateDropdownPropsInterface) => {
    const formattedDate = format(tripDate, "EEEE, MMMM dd");
    const isOpen = selectedDay === tripDay.day;
    const router = useRouter();
    const { tripId } = useParams();
    const [destinations, setDestinations] = useState(tripDay.voted_dests || []);
    const [distance, setDistance] = useState(tripDay.distance || []);
    const [loading, setLoading] = useState(false);

    // Memoizing calculation of number of available destinations
    const numOfAvailableDest = useMemo(() => {
        return tripDay.status === "complete"
            ? tripDay.voted_dests?.length
            : tripDay.suitableDests?.length || 0;
    }, [tripDay]);

    // Function to toggle showing destinations
    const showContent = () => {
        if (tripDay.status === "pending") {
            setSelectedDay?.(null);
            showToast();
            return;
        }

        setSelectedDay?.(isOpen ? null : tripDay.day); // Close if already open, otherwise open

        if (setMarker) {
            if (!isOpen) {
                const destinations_markers = tripDay.status === "complete" ? destinations : tripDay.suitableDests;
                const markers = destinations_markers?.map((dest: any, index: number) => ({
                    lat: dest.lat,
                    lng: dest.lon,
                    name: tripDay.status === "complete" ? `(${index + 1}) ${dest.destName}` : dest.destName
                })) || [];
                setMarker(markers);
            } else {
                setMarker([]); // Clear markers when hiding destinations
            }
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

    // Memoize distance calculation
    const getDistanceInfo = (dest: any, index: number) => {
        return useMemo(() => {
            return distance.find((d: any, distanceIndex: number) => d.fromID === dest.destID && index === distanceIndex);
        }, [distance, dest.destID, index]);
    };

    // useEffect to automatically update markers when destinations change
    useEffect(() => {
        if (setMarker) {
            const markers = destinations.map((dest: any, index: number) => ({
                lat: dest.lat,
                lng: dest.lon,
                name: tripDay.status === "complete" ? `(${index + 1}) ${dest.destName}` : dest.destName
            }));
            setMarker(markers);
        }
    }, [destinations, tripDay.status, setMarker]);

    useEffect(() => {
        if (loading) {
            document.documentElement.style.cursor = "wait"; // Apply to the entire document
            document.body.style.cursor = "wait"; // Ensure it's applied to body
            document.body.style.pointerEvents = "none"; // Disable interactions
        } else {
            document.documentElement.style.cursor = "default";
            document.body.style.cursor = "default";
            document.body.style.pointerEvents = "auto";
        }
    
        return () => {
            document.documentElement.style.cursor = "default";
            document.body.style.cursor = "default";
            document.body.style.pointerEvents = "auto";
        };
    }, [loading]);

    return (
        <div className={clsx("flex flex-col bg-transparent w-full")}>
            {/* Clickable Icon for toggling */}
            <div onClick={showContent} className="flex items-center gap-4">
                {isOpen ? (
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
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "h-auto" : "h-0"}`}>
                <div className={clsx(
                    "flex border-b-2 border-black/50 ml-16 pb-4 pt-2",
                    tripDay.status === "complete" ? "flex-col justify-center overflow-y-auto" : "items-center overflow-x-auto pb-4",                    
                )}>                    
                    {tripDay.status === "complete" && destinations?.map((dest: any, index: number) => {
                        const distanceInfo = getDistanceInfo(dest, index);

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
                                            showWrongOrder={showWrongOrder}
                                            tripDate={tripDate}
                                            tripId={tripId}
                                            index={index}
                                            setDestinations={setDestinations}
                                            setDistance={setDistance}
                                            setLoading={setLoading}
                                            loading={loading}
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
};

export default TripDayDropDown;
