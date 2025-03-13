'use client';

import { ChevronDownIcon, ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { SunIcon, MoonIcon, CloudIcon } from "@heroicons/react/24/solid";import { useRouter } from "next/navigation";
import { format } from "date-fns";
import DestCard from "./DestCard";
import clsx from "clsx";
import { BaseButton } from "@/app/components/buttons/BaseButton";

interface TripDateDropdownPropsInterface {
    key: any;
    tripDate: Date;
    tripDay: any;
};

export default function TripDayDropDown({ key, tripDate, tripDay }: TripDateDropdownPropsInterface) {
    const formattedDate = format(tripDate, "EEEE, MMMM dd");
    const [showDestination, setShowDestination] = useState<boolean>(false);
    const [isVoted] = useState<boolean>(false); // tbd

    // Function to toggle showing destinations
    const showContent = () => {
        if (tripDay.status === "pending") {
            setShowDestination(false);
        } else {
            setShowDestination(prevState => !prevState); // Toggle state
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
                                <label className="text-xl"> Total vote: {tripDay.members_voted} / {tripDay.total_members}, </label>
                                <BaseButton
                                    buttonTxt="Vote"
                                    className="text-sm"
                                    leftIconCustomization="w-[15px] h-[15px]"
                                    onClick={(event: any) => {
                                        event.stopPropagation(); // Prevents triggering showContent
                                        alert("Navigate to voting page.");
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <label
                        className="text-xl border-b-2 border-black/50 w-full cursor-pointer pb-6">  </label>
                </div>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ${showDestination ? "h-auto" : "h-0"}`}
            >
                <div className={clsx(
                    "flex border-b-2 border-black/50 ml-16 pb-4 pt-2", 
                        tripDay.status === "complete" ? "flex-col justify-center overflow-y-auto" : "items-center overflow-x-auto pb-4"
                    )}>
                    {tripDay.status === "complete" && (
                        <div className="flex flex-col">
                            {Object.keys(tripDay.voted_dests).map((periodKey: string) => {
                                const period = tripDay.voted_dests[periodKey]; // Get list of destinations

                                return (
                                    <div key={periodKey} className="rounded-lg p-2 pt-0 pb-0 pr-4">
                                        <div className="flex ml-14 gap-4">
                                            {periodKey === "morning" && <SunIcon className="w-6 h-6 text-yellow" />}
                                            {periodKey === "afternoon" && <CloudIcon className="w-6 h-6 text-blue" />}
                                            {periodKey === "night" && <MoonIcon className="w-6 h-6 text-gray" />}
                                            <label className="text-xl font-bold capitalize">{periodKey}</label>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            {period.map((dest: any, index: number) => {
                                                const distanceInfo = tripDay.distance.find(
                                                    (d: any) => d.fromID === dest.destID
                                                );
                                                
                                                return (
                                                    <div key={`${periodKey}-${index}`} className="flex flex-col">
                                                        {/* Destination */}
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex flex-col h-full"> {/* Set minimum height */}
                                                                <MapPinIcon width={40} height={40} fill="red" />
                                                                {distanceInfo && (
                                                                    <div className="flex flex-col items-center justify-center w-[40px] text-center pl-[1px]">
                                                                        <div className="w-[2px] h-7 bg-black"></div>                                                    
                                                                        <p className="py-2"> {distanceInfo.distance_km} km</p> 
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
                                                            
                                                            <DestCard key={dest.destID} destData={dest} complete={true} period={periodKey}/>
                                                        </div>                                                        
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}                            
                        </div>                        
                    )}
                    {tripDay.status === "voting" && (
                        <div className="flex items-center gap-8 min-w-max">
                            {tripDay.suitableDests.map((dest: any) => (
                                <DestCard key={dest.destID} destData={dest} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
