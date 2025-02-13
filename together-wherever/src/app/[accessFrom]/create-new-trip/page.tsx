'use client';

import { useState, useEffect } from 'react';
import { Input } from '@headlessui/react';
import PlaceSearchBox from "@/app/components/PlaceSearchBox";
import DateRangeInput from '@/app/components/DateRangeInput'
import { BaseButton } from "@/app/components/buttons/BaseButton";
import { PlaceDetails } from "@/app/types";
import axios from "axios";
import { addDays } from "date-fns";

const defaultCenter = {
    lat: 13.736717, // Default to Bangkok, Thailand
    lng: 100.523186,
};

export default function CreateNewTrip() {
    const [tripName, setTripName] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(defaultCenter);
    const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: "selection",
        },
    ]);
    
    // Helper function to format strings
    const formatString = (str: string) => {
        return str
            .replace(/_/g, " ") // Replace underscores with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
    };

    const fetchPlaceDetails = async (placeId: string) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/discover-place-details/?dest_id=${placeId}`);
            const data = res.data as PlaceDetails;

            console.log("Fetched Place Data:", data);

            const lat = data.lat ?? defaultCenter.lat;
            const lng = data.lon ?? defaultCenter.lng;

            setPlaceDetails(data);
            setSelectedPlace({ lat, lng });
        } catch (error) {
            console.error("Failed to fetch place details", error);
        }
    };

    const handleChangeTripName = (e: any) => {
        setTripName(e.target.value);
    };

    const handleChangeCompanions = (e: any) => {
        setTripName(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Trip Name:', tripName);
    };

    const handleClick = () => {
        alert("Click!");
      };

    return (
        <div className="flex flex-col items-center justify-center gap-4 px-12 pb-12">
            <div className="flex justify-center font-bold text-4xl">
                Plan a Trip
            </div>
            <div className="flex w-[1100px]">
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="trip-name" className="text-xl font-bold text-black">
                            Trip Name
                        </label>
                        <Input
                            id="trip-name"
                            type="text"
                            value={tripName}
                            onChange={handleChangeTripName}
                            placeholder="e.g., Summer in Phuket w/ my gang"
                            className={
                                "mt-1 block w-full h-[50px] rounded-xl border-2 border-hurricane bg-transparent py-1.5 px-3 focus:outline-none focus:ring-0"
                            }
                        /> 
                        <label className='flex justify-end text-base text-hurricane'> 0/50 max characters </label>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="trip-name" className="text-xl font-bold text-black">
                            Where to?
                        </label>
                        <PlaceSearchBox onSelect={fetchPlaceDetails} />
                    </div>
                    <div className="flex w-full mt-4 gap-2">
                        <div className="flex flex-col gap-2 w-1/2">
                            <label htmlFor="trip-name" className="text-xl font-bold text-black">
                                Dates
                            </label>
                            <div className="w-full">
                                <DateRangeInput range={range} setRange={setRange}/>
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 h-full">                            
                            <label htmlFor="trip-name" className="text-xl font-bold text-black">
                                Companion
                            </label>
                            <div className="flex flex-col flex-grow">
                                <div className="mt-1">
                                    <label className="text-base">Invite companions</label>
                                    <Input
                                        id="companions"
                                        type="text"
                                        value={tripName}
                                        onChange={handleChangeCompanions}
                                        placeholder="Enter username"
                                        className="mt-1 block w-full h-[50px] rounded-xl border-2 border-hurricane bg-transparent py-1.5 px-3 focus:outline-none focus:ring-0"
                                    />
                                </div>
                            </div>
                            <div className="mt-auto flex justify-center w-full">
                                <BaseButton 
                                    buttonTxt="Start Planning" 
                                    onClick={handleClick}
                                    className="!px-10"
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}