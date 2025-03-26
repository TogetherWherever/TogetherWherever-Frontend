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
    orderedDestinations?: Array<DestDataInterface>; // Optional prop for ordered destinations
    setOrderedDestinations?: Dispatch<any>; // Function to update orderedDestinations
    tripDate: Date;
    tripId?: string | string[];
    showWrongOrder?: () => void;
    index?: number;
    tripDay?: string;
}

export default function DestCard({
    destData,
    complete,
    orderedDestinations,
    setOrderedDestinations,
    tripDate,
    tripId,
    index,
    tripDay,
    showWrongOrder
}: DestCardPropsInterface) {
    const dayOfWeek = format(tripDate || new Date(), "EEEE");
    const todayOpeningClosingHours = destData.openingHours[dayOfWeek as keyof typeof destData.openingHours];

    const handleNavigateToDiscoverPageDetail = () => {
        window.open(`/discover/${destData.destID}`, '_blank');
    };

    const handleMoveUp = async (
        index: number | undefined,
        destinationID: string
    ) => {
        const action = "move-up";
        const oldOrder = index
        const newOrder = index !== undefined ? index - 1 : 0;

        const res = await updateDestination({ destinationID, action, tripDay, tripId, oldOrder, newOrder });
        if (res !== null) {
            console.log(`Destination successfully updated.`);
            console.log(res);
        } else {
            console.error(`Failed to update destination.`);
        }
    };

    const handleMoveDown = async (
        index: number | undefined,
        destinationID: string
    ) => {
        const action = "move-down";
        const oldOrder = index
        const newOrder = index !== undefined ? index + 1 : 0;

        const res = await updateDestination({ destinationID, action, tripDay, tripId, oldOrder, newOrder });

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
            <div className={clsx("relative", !complete ? "w-[250px]" : "w-[250px]")}>
                <Image
                    src={destData.photo}
                    alt="Destination Image"
                    fill
                    className="object-cover"
                />
            </div>

            <div className={clsx("flex flex-col justify-between h-full w-2/3")}>
                <div className="flex items-center gap-2 text-2xl">
                    <div className='flex gap-2 font-bold cursor-pointer '>
                        <label className={"line-clamp-2 cursor-pointer"}>
                            {complete && (index !== undefined ? `(${index + 1})` : 'N/A')} {destData.destName}
                        </label>
                    </div>
                </div>
                {complete && (
                    <div className={'text-md text-gray-600'}>
                        Open: {todayOpeningClosingHours.open} | Close: {todayOpeningClosingHours.close}
                    </div>
                )}
                <div className={clsx("overflow-hidden text-ellipsis text-lg line-clamp-2")}>
                    {destData.desc !== "" ? destData.desc : "<No description provided>"}
                </div>
            </div>

            {complete && (
                <div className='flex justify-end w-1/5'>
                    <div className="flex flex-col justify-between">
                        {index === 0 ? (
                            <></>
                        ) : (
                            <ChevronUpIcon
                                width={40}
                                height={40}
                                className="opacity-25 hover:opacity-100"
                                onClick={(event: any) => {
                                    event.stopPropagation();
                                    handleMoveUp(
                                        index,
                                        destData.destID,
                                    );
                                }}
                            />
                        )}
                        {index === (orderedDestinations?.length ?? 0) - 1 ? (
                            <></>
                        ) : (
                            <div className={clsx(index === 0 ? "flex flex-col justify-end h-full" : "")}>
                                <ChevronDownIcon
                                    width={40}
                                    height={40}
                                    className="opacity-25 hover:opacity-100"
                                    onClick={(event: any) => {
                                        event.stopPropagation();
                                        handleMoveDown(
                                            index,
                                            destData.destID,
                                        );
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
