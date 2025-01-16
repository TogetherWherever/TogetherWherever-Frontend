'use client';

import Image from "next/image"; 
import { BaseCard } from "@/app/components/cards/BaseCard"
import { CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface TripCardPropsInterface {
  profileImage: string;
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

export const TripCard = ({profileImage, image, startDate, endDate, destinationsNumber, cardName, onClick}: TripCardPropsInterface) => {
  return (
    <div className="flex flex-col">
      <BaseCard cardName={cardName} image={image} onClick={onClick}/>
      <div className="mt-3 flex items-center">
        <Image
          src={profileImage}
          alt="img"
          width={50}
          height={50}
          objectFit="cover"
          className="rounded-full aspect-square object-cover mr-2"
        />        
        <CalendarIcon className="w-[35px] h-[35px]"/>
        <div className="mx-2 text-xl"> {formatDateRange(startDate, endDate)} </div>       
        <MapPinIcon className="w-[35px] h-[35px]"/>
        <div className="mx-2 text-xl"> {destinationsNumber} Places </div>
      </div>
    </div>
  );
};