'use client';

import { ChevronDownIcon, ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import DestCard from "./DestCard";

interface TripDateDropdownPropsInterface {
  tripDate: Date;
  tripDay: Array<any>
};

export default function TripDayDropDown({tripDate, tripDay}: TripDateDropdownPropsInterface) {
  const formattedDate = format(tripDate, "EEEE, MMMM dd");
  const [showDestination, setShowDestination] = useState<boolean>(false);
  const numOfAvailableDest = tripDay.length;
  const [isVoted] = useState<boolean>(false); // tbd

  // Generate a stable random color
  const randomColor = useMemo(() => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }, []);

  return (
    <div className="flex flex-col bg-transparent gap-4 w-full">
      {/* Clickable Icon for toggling */}
      <div 
        onClick={() => setShowDestination(prev => !prev)} 
        className="flex items-center gap-4"
      >
        {showDestination ? (
          <ChevronDownIcon className="w-12 h-12 cursor-pointer" />
        ) : (
          <ChevronRightIcon className="w-12 h-12 cursor-pointer" />
        )}

        {/* Trip Information */}
        <div className="flex flex-col w-full pb-4 cursor-pointer">
          <div className="flex gap-4 items-center cursor-pointer">
            <label className="text-4xl cursor-pointer"> {formattedDate} </label>
            <MapPinIcon className="w-8 h-8 cursor-pointer" style={{ color: randomColor }} />
          </div>
          <label className="text-xl border-b-2 border-black/50 w-full cursor-pointer pb-6"> {numOfAvailableDest} Places {isVoted ? "Voted" : "Available"} </label>     
        </div>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-300 ${showDestination ? "h-auto" : "h-0"}`}
      >
        <div className="flex items-center overflow-x-auto border-b-2 border-black/50 ml-16 pb-4">
          <div className="flex items-center gap-8 min-w-max">
            {tripDay.map((dest) => (
              <DestCard key={dest.destID} destData={dest} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
