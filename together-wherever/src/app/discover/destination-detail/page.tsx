'use client';

import MapView from "@/app/components/Map";
import { useState } from "react";

const defaultCenter = {
    lat: 13.736717, // Default to Bangkok, Thailand
    lng: 100.523186,
};

export default function DiscoverPage() {
    const [selectedPlace, setSelectedPlace] = useState(defaultCenter);

    return (
        <div className="flex flex-row">
            <div className="w-full px-5 pt-5">
            </div>
            <div className="w-full h-screen z-0">
                <MapView lat={selectedPlace.lat} lng={selectedPlace.lng} />
            </div>
        </div>
    );
}
