import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Dispatch, useCallback, memo, useState } from 'react';
import { format } from "date-fns";
import { updateDestination } from "@/fetcher/destinationScheduling";

interface DestDataInterface {
    destID: string;
    destName: string;
    photo: string;
    desc: string;
    openDays: string[];
    openingHours: Record<string, { open: string; close: string }>;
    lat: number;
    lng: number;
}

interface DestCardPropsInterface {
    destData: DestDataInterface;
    complete?: boolean;
    orderedDestinations?: DestDataInterface[];
    setDestinations?: Dispatch<any>;
    setDistance?: Dispatch<any>;
    setLoading?: Dispatch<any>;
    tripDate: Date;
    tripId?: string | string[];
    showWrongOrder?: () => void;
    index?: number;
    tripDay?: string;
    loading?: any;
    setMarker?: Dispatch<any>;
}

const DestCard = ({
    destData,
    complete = false,
    orderedDestinations = [],
    tripDate,
    tripId,
    index,
    tripDay,
    setDestinations,
    setDistance,
    setLoading,
    loading,
    setMarker
}: DestCardPropsInterface) => {
    const dayOfWeek = format(tripDate, "EEEE");
    const todayOpeningClosingHours = destData.openingHours[dayOfWeek];

    const handleNavigateToDiscoverPageDetail = useCallback(() => {
        window.open(`/discover/${destData.destID}`, '_blank');
    }, [destData.destID]);

    const handleMove = useCallback(async (direction: "move-up" | "move-down") => {
        // Move the early return logic inside the callback
        if (index === undefined || !setDestinations || !setDistance) {
            return;
        }

        setLoading?.(true);
        const oldOrder = index + 1;
        const newOrder = direction === "move-up" ? oldOrder - 1 : oldOrder + 1;

        try {
            const res = await updateDestination({
                destinationID: destData.destID,
                action: direction,
                tripDay: Number(tripDay),
                tripId: Number(tripId),
                oldOrder,
                newOrder
            });

            if (res) {
                setDestinations(res.voted_dests);
                setDistance(res.distance);
                    const markers = res.voted_dests.map((dest: any, index: number) => ({
                        lat: dest.lat,
                        lng: dest.lon,
                        name: complete ? `(${index + 1}) ${dest.destName}` : dest.destName
                    }));
                //     setMarker?.(markers);
                setMarker?.(markers)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading?.(false);
        }
    }, [
        index,
        destData.destID,
        tripDay,
        tripId,
        setDestinations, // These should be stable references
        setDistance,     // If they can be undefined, keep them in deps
    ]);

    return (
        <div
            className={clsx(
                "flex justify-left p-4 gap-4 rounded-lg bg-satin-linen h-[150px] cursor-pointer",
                complete ? "w-full" : "w-[500px]",
                loading ? "cursor-wait" : ""
            )}
            onClick={handleNavigateToDiscoverPageDetail}
        >
            <div className="relative w-[250px]">
                <Image src={destData.photo} alt="Destination Image" fill className="object-cover" />
            </div>

            <div className="flex flex-col justify-between h-full w-2/3">
                <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer">
                    <label className="line-clamp-2">
                        {complete && index !== undefined ? `(${index + 1}) ` : ""}{destData.destName}
                    </label>
                </div>
                {complete && (
                    <div className="text-md text-gray-600">
                        Open: {todayOpeningClosingHours?.open} | Close: {todayOpeningClosingHours?.close}
                    </div>
                )}
                <div className="overflow-hidden text-ellipsis text-lg line-clamp-2">
                    {destData.desc || "<No description provided>"}
                </div>
            </div>

            {complete && (
                <div className={clsx("flex flex-col items-end pr-4 w-1/5", index === 0 ? "justify-end h-full" : "justify-between")}>
                    {index !== 0 && (
                        <ChevronUpIcon
                            width={40}
                            height={40}
                            className="opacity-25 hover:opacity-100"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMove("move-up");
                            }}
                        />
                    )}
                    {index !== orderedDestinations.length - 1 && (
                        <ChevronDownIcon
                            width={40}
                            height={40}
                            className="opacity-25 hover:opacity-100"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleMove("move-down");
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(DestCard);