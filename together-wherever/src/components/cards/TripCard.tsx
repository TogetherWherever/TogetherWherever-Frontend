'use client';

import Image from "next/image";
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';
import ProfileIcon from "@/components/ProfileIcon";

interface TripCardPropsInterface {
    key?: number;
    tripId?: number;
    owner?: string;
    image: string;
    startDate: Date;
    endDate: Date;
    destinationsNumber: number;
    cardName: string;
    onClick?: () => void;
};

const formatDateRange = (startDate: Date, endDate: Date): string => {
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
    const startYear = startDate.getFullYear();

    const endDay = endDate.getDate();
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });
    const endYear = endDate.getFullYear();

    // Case 1: If both dates are the same day
    if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
        return `${startDay} ${startMonth} ${startYear}`;
    }

    // Case 2: If the start and end date are in different months and/or years
    if (startMonth !== endMonth || startYear !== endYear) {
        if (startYear !== endYear) {
            return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
        } else {
            return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
        }
    }

    // Case 3: If start and end date are in the same month and year but different days
    return `${startDay} - ${endDay} ${startMonth} ${startYear}`;
}

export const TripCard = ({ key, owner, image, startDate, endDate, destinationsNumber, cardName, onClick }: TripCardPropsInterface) => {
    return (
        <div className="flex flex-col">
            <div className="relative cursor-pointer" onClick={onClick}>
                <Image
                    className="rounded-2xl object-cover w-[400px] h-[200px]"
                    src={image}
                    alt="Trip image"
                    width={400}
                    height={200}
                    objectFit="cover"
                />
                <div className="w-full absolute bottom-0 left-0 px-2 py-3">
                    <h2 className="text-3xl text-mint-cream font-semibold">
                        {cardName}
                    </h2>
                </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
                {owner && (<div className="flex flex-col group items-center" key={owner}>
                    <div className="w-[40px] h-[40px]">
                        <ProfileIcon username={owner} width={40} height={40} />
                    </div>

                    <div className="absolute mt-[40px] flex text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {owner}
                    </div>
                </div>)}
                <div className={"flex"}>
                    <CalendarIcon className="w-[25px] h-[25px]" />
                    <div className="mx-2 text-xl"> {formatDateRange(startDate, endDate)} </div>
                    <MapPinIcon className="w-[25px] h-[25px]" />
                    <div className="mx-2 text-xl"> {destinationsNumber} Places </div>
                </div>
            </div>
        </div>
    );
};