import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { Dispatch } from 'react';
import { format } from "date-fns";

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
    period?: string;
    orderedDestinations?: { [key: string]: Array<DestDataInterface> }; // Optional prop for ordered destinations
    setOrderedDestinations?: Dispatch<any>; // Function to update orderedDestinations
    tripDate?: Date;
}

export default function DestCard({
    destData,
    complete,
    period,
    orderedDestinations,
    setOrderedDestinations,
    tripDate
}: DestCardPropsInterface) {
    const dayOfWeek = format(tripDate || new Date(), "EEEE");
    const todayOpeningClosingHours = destData.openingHours[dayOfWeek as keyof typeof destData.openingHours];

    const handleNavigateToDiscoverPageDetail = () => {
        window.open(`/discover/${destData.destID}`, '_blank');
    };

    // Check if orderedDestinations and period are provided
    const periodKey = period || ""; // Use destID or another unique key as period key
    const destinationIndex = orderedDestinations?.[periodKey]?.findIndex(
        (item) => item.destID === destData.destID
    );
    const isLastDestination =
        periodKey === "night" && orderedDestinations?.[periodKey]?.length
            ? destinationIndex === orderedDestinations[periodKey]?.length - 1
            : false;

    const getAvailableTimeSections = (openTime: string, closeTime: string) => {
        const sections = {
            "morning": { start: "06:00", end: "12:00" },
            "afternoon": { start: "12:00", end: "18:00" },
            "night": { start: "18:00", end: "23:59" } // Avoids next day
        };

        const parseTime = (timeStr: string) => {
            return new Date(`1970-01-01T${timeStr}:00`);
        }

        const openDate = parseTime(openTime);
        const closeDate = parseTime(closeTime);
        let availableSections = [];

        for (const [section, { start, end }] of Object.entries(sections)) {
            const sectionStart = parseTime(start);
            const sectionEnd = parseTime(end);

            // Check if the open-close time overlaps with the section
            if (openDate < sectionEnd && closeDate > sectionStart) {
                availableSections.push(section);
            }
        }

        return availableSections;
    }

    const isWithinTimeRange = (open: string, close: string, period: string) => {
        const availableSections = getAvailableTimeSections(open, close);
        if (availableSections.includes(period)) {
            return true;
        }
        return false;
    };

    const handleMoveUp = (index: number, periodKey: string) => {
        const newDestinations = { ...orderedDestinations };
        const destinationToMove = newDestinations[periodKey][index];
        let periodToMove = "";
        if (index === 0 && periodKey === "afternoon") {
            periodToMove = "morning"
            if (isWithinTimeRange(todayOpeningClosingHours.open, todayOpeningClosingHours.close, "morning")) {
                newDestinations[periodToMove].push(destinationToMove);
                newDestinations[periodKey].splice(index, 1);
                console.log(newDestinations);
            }
        }
        else if (index === 0 && periodKey === "night") {
            periodToMove = "afternoon"
            if (isWithinTimeRange(todayOpeningClosingHours.open, todayOpeningClosingHours.close, "afternoon")) {
                newDestinations[periodToMove].push(destinationToMove);
                newDestinations[periodKey].splice(index, 1);
                console.log(newDestinations);
            }
        }
        else if (index !== 0) {
            newDestinations[periodKey].splice(index, 1);
            newDestinations[periodKey].splice(index - 1, 0, destinationToMove);
            console.log(newDestinations);
        }
    };

    const handleMoveDown = (index: number, periodKey: string) => {
        const newDestinations = { ...orderedDestinations };
        const destinationToMove = newDestinations[periodKey][index];
        let periodToMove = "";
        if (index === newDestinations[periodKey].length - 1 && periodKey === "afternoon") {
            periodToMove = "night"
            if (isWithinTimeRange(todayOpeningClosingHours.open, todayOpeningClosingHours.close, "night")) {
                newDestinations[periodToMove].unshift(destinationToMove);
                newDestinations[periodKey].splice(index, 1);
                console.log(newDestinations);
            }
        }
        else if (index === newDestinations[periodKey].length - 1 && periodKey === "morning") {
            periodToMove = "afternoon"
            if (isWithinTimeRange(todayOpeningClosingHours.open, todayOpeningClosingHours.close, "afternoon")) {
                newDestinations[periodToMove].unshift(destinationToMove);
                newDestinations[periodKey].splice(index, 1);
                console.log(newDestinations);
            }
        }
        else if (index < newDestinations[periodKey].length - 1) {
            newDestinations[periodKey].splice(index, 1);
            newDestinations[periodKey].splice(index + 1, 0, destinationToMove);
            console.log(newDestinations);
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
                    <label className='font-bold cursor-pointer'>{destData.destName} </label>
                    {complete && (
                        <div className={'text-lg'}>
                            (Open: {todayOpeningClosingHours.open} | Close: {todayOpeningClosingHours.close})
                        </div>
                    )}
                </div>
                <div className={clsx("overflow-hidden text-ellipsis text-lg", complete ? "line-clamp-3" : "line-clamp-2")}>
                    {destData.desc}
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
                                handleMoveUp(destinationIndex, periodKey); // Pass the periodKey here
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
                                    handleMoveDown(destinationIndex, periodKey); // Pass the periodKey here
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
