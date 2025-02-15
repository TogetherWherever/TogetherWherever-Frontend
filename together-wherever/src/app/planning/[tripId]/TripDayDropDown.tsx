'use client';

import { ChevronDownIcon, ChevronRightIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useState, useMemo } from "react";

export default function TripDayDropDown() {
  const [showDestination, setShowDestination] = useState<boolean>(false);

  // Generate a stable random color
  const randomColor = useMemo(() => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }, []);

  return (
    <div className="cursor-pointer flex flex-col bg-transparent gap-4 w-full">
      {/* Clickable Icon for toggling */}
      <div 
        onClick={() => setShowDestination(prev => !prev)} 
        className="flex items-center gap-4"
      >
        {showDestination ? (
          <ChevronDownIcon className="w-12 h-12" />
        ) : (
          <ChevronRightIcon className="w-12 h-12" />
        )}

        {/* Trip Information */}
        <div className="flex flex-col w-full pb-4 cursor-pointer">
          <div className="flex gap-4 items-center">
            <label className="text-4xl cursor-pointer"> dddd, MMMM dd </label>
            <MapPinIcon className="w-8 h-8" style={{ color: randomColor }} />
          </div>
          <label className="text-xl border-b-2 border-black/50 w-full cursor-pointer"> n Places </label>     
        </div>
      </div>

      {/* Expandable Section with Smooth Transition */}
      <div 
        className={`overflow-hidden transition-all duration-300 ${showDestination ? "h-[200px]" : "h-0"}`}
      >
        <div className="w-full h-[200px] border-b-2 border-black/50 ml-16">
          {/* Add more details here */}
        </div>
      </div>
    </div>
  );
}
