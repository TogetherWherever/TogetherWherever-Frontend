'use client';

import { useState, useEffect } from 'react';
import { Input } from '@headlessui/react';
import PlaceSearchBox from "@/app/components/PlaceSearchBox";
import { PlaceDetails } from "@/app/types";
import axios from "axios";

const defaultCenter = {
    lat: 13.736717, // Default to Bangkok, Thailand
    lng: 100.523186,
};

export default function CreateNewTrip() {
    const [tripName, setTripName] = useState('');
    const [selectedPlace, setSelectedPlace] = useState(defaultCenter);
        const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
    
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

    const handleChange = (e: any) => {
        setTripName(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Trip Name:', tripName);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center gap-4">
            <div className="flex justify-center w-full font-bold text-4xl">
                Plan a Trip
            </div>
            <div className="flex max-w-[1100px] w-full">
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="trip-name" className="text-xl font-bold text-black">
                            Trip Name
                        </label>
                        <Input
                            id="trip-name"
                            type="text"
                            value={tripName}
                            onChange={handleChange}
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
                </form>
            </div>
        </div>
    );
}