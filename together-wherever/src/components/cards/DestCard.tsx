import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Dispatch } from 'react';
import { format } from "date-fns";
import { updateDestination } from "@/fetcher/destinationScheduling";

interface DestDataInterface {
    destID: string;
    destName: string;
    photo: string;
    desc: string;
    openDays: Array<string>;
    openingHours: any;
    lat: number;
    lng: number;
}

interface DestCardPropsInterface {
    destData: DestDataInterface;
    complete?: boolean;
    period?: "morning" | "afternoon" | "night";
    orderedDestinations?: { [key: string]: Array<DestDataInterface> }; // Optional prop for ordered destinations
    setOrderedDestinations?: Dispatch<any>; // Function to update orderedDestinations
    tripDate: Date;
    tripId?: string | string[];
    showWrongOrder?: () => void;
}

export default function DestCard({
    destData,
    complete,
    period,
    orderedDestinations,
    setOrderedDestinations,
    tripDate,
    tripId,
    showWrongOrder
}: DestCardPropsInterface) {
    const dayOfWeek = format(tripDate || new Date(), "EEEE");
    const todayOpeningClosingHours = destData.openingHours[dayOfWeek as keyof typeof destData.openingHours];

    const handleNavigateToDiscoverPageDetail = () => {
        window.open(`/discover/${destData.destID}`, '_blank');
    };

    const periodKey = period as "morning" | "afternoon" | "night";
    const destinationIndex = orderedDestinations?.[periodKey]?.findIndex(
        (item) => item.destID === destData.destID
    );
    const isLastDestination =
        periodKey === "night" && orderedDestinations?.[periodKey]?.length
            ? destinationIndex === orderedDestinations[periodKey]?.length - 1
            : false;

    const handleMoveUp = (
        index: number,
        periodKey: "morning" | "afternoon" | "night",
        destinationID: string
    ) => {
        const fromCategory = periodKey;
        let action: "move" | "reorder" = "move";
        let toCategory: "morning" | "afternoon" | "night" | null = null;
        let newIndex = null;       

        if (index === 0) {
            action =  "move";
            if (period === "afternoon") {
                toCategory = "morning"
            } else {
                toCategory = "afternoon"
            }
        } else {
            action =  "reorder";
            newIndex = index - 1;
        }
        
        const res = updateDestination({ action, destinationID, fromCategory, toCategory, newIndex, tripDate, tripId });
        if (res !== null) {
            console.log(`Destination successfully updated.`);
            console.log(res);
        } else {
            console.error(`Failed to update destination.`);
        }
    };

    const handleMoveDown = (
        index: number,
        periodKey: "morning" | "afternoon" | "night",
        destinationID: string
    ) => {  
        const fromCategory = periodKey;
        let action: "move" | "reorder" = "move";
        let toCategory: "morning" | "afternoon" | "night" | null = null;
        let newIndex = null;

        const newDestinations = { ...orderedDestinations };
        const periodDestinations = newDestinations[periodKey];

        if (index === periodDestinations?.length - 1) {
            action =  "move";
            if (period === "morning") {
                toCategory = "afternoon"
            } else {
                toCategory = "night"
            }
        } else {
            action =  "reorder";
            newIndex = index + 1;
        }

        const res = updateDestination({ action, destinationID, fromCategory, toCategory, newIndex, tripDate, tripId });

        if (res !== null) {
            console.log(`Destination successfully updated.`);
            console.log(res);
        } else {
            console.error(`Failed to update destination.`);
        }
    };

    return (
        <div
            className={clsx(
                "flex justify-left p-4 gap-4 rounded-lg bg-satin-linen h-[150px] cursor-pointer",
                complete ? "w-full" : "w-[500px]"
            )}
            onClick={handleNavigateToDiscoverPageDetail}
        >
            <div className={clsx("relative", !complete ? "w-[250px]" : "w-[400px]")}>
                <Image
                    src={destData.photo}
                    alt="Destination Image"
                    fill
                    className="object-cover"
                />
            </div>

            <div className={clsx("flex flex-col justify-between h-full", complete ? "" : "w-2/3")}>
                <div className="flex items-center gap-2 text-2xl">
                    <label className='font-bold cursor-pointer line-clamp-2'>{destData.destName} </label>
                </div>
                {complete && (
                    <div className={'text-md text-gray-600'}>
                        Open: {todayOpeningClosingHours.open} | Close: {todayOpeningClosingHours.close}
                    </div>
                )}
                <div className={clsx("overflow-hidden text-ellipsis text-lg line-clamp-2")}>
                    {destData.desc !== "" ? destData.desc : "No description provided"}
                </div>
            </div>

            {complete && destinationIndex !== undefined && (
                <div className="flex flex-col justify-between">
                    {/* Hide ChevronUpIcon if first destination in morning */}
                    {destinationIndex === 0 && period === "morning" ? (
                        <></>
                    ) : (
                        <ChevronUpIcon
                            width={40}
                            height={40}
                            className="opacity-25 hover:opacity-100"
                            onClick={(event: any) => {
                                event.stopPropagation();
                                handleMoveUp(
                                    destinationIndex,
                                    periodKey,
                                    destData.destID,
                                );
                            }}
                        />
                    )}
                    {/* Hide ChevronDownIcon if last destination in night */}
                    {isLastDestination && period === "night" ? (
                        <></>
                    ) : (
                        <div className={clsx(period === "morning" && destinationIndex === 0 ? "flex flex-col justify-end h-full" : "")}>
                            <ChevronDownIcon
                                width={40}
                                height={40}
                                className="opacity-25 hover:opacity-100"
                                onClick={(event: any) => {
                                    event.stopPropagation();
                                    handleMoveDown(
                                        destinationIndex,
                                        periodKey,
                                        destData.destID,
                                    );
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
