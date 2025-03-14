import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
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
    const router = useRouter();
    const dayOfWeek = format(tripDate || new Date(), "EEEE");
    const todayOpeningClosingHours = destData.openingHours[dayOfWeek as keyof typeof destData.openingHours];

    const handleNavigateToDiscoverPageDetail = () => {
        router.push(`/discover/${destData.destID}`);
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

    const isWithinTimeRange = (open: string, close: string, period: string) => {
        // const now = new Date();
        // const openTime = new Date(now);
        // openTime.setHours(Number(open.split(":")[0]), Number(open.split(":")[1]), 0, 0);

        // // Define valid time ranges
        // let validStart, validEnd;
        // switch (period) {
        //     case "morning":
        //         validStart = new Date(now);
        //         validStart.setHours(6, 0, 0, 0); // 06:00 AM
        //         validEnd = new Date(now);
        //         validEnd.setHours(12, 0, 0, 0); // 12:00 PM
        //         break;
        //     case "afternoon":
        //         validStart = new Date(now);
        //         validStart.setHours(12, 0, 0, 0); // 12:00 PM
        //         validEnd = new Date(now);
        //         validEnd.setHours(18, 0, 0, 0); // 06:00 PM
        //         break;
        //     case "night":
        //         validStart = new Date(now);
        //         validStart.setHours(18, 0, 0, 0); // 06:00 PM
        //         validEnd = new Date(now);
        //         validEnd.setHours(23, 59, 59, 999); // 11:59 PM
        //         break;
        //     default:
        //         return false; // Invalid period
        // }

        // // Check if the destination's opening and closing hours are within the valid time range
        // if (openTime >= validStart && openTime <= validEnd) {
        //     return true;
        // }

        return true;
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
            <div className={clsx("flex items-center", !complete ? "w-[150px]" : "w-[250px]")}>
                <Image
                    src={destData.photo}
                    alt="Logo"
                    width={200}
                    height={200}
                    className=""
                />
            </div>

            <div className={clsx("flex flex-col justify-between h-full", complete ? "" : "w-2/3")}>
                <div className="flex items-center gap-2 text-2xl">
                    <label>{destData.destName} </label>
                    <div className='text-lg'>
                        (Open: {todayOpeningClosingHours.open} | Close: {todayOpeningClosingHours.close})
                    </div>
                </div>
                <div className="overflow-hidden text-ellipsis line-clamp-3 text-lg">
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
