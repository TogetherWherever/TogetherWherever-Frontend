'use client';

import { useState } from "react";
import PlaceSearchBox from "@/app/components/PlaceSearchBox";
import MapView from "@/app/components/Map";
import { PlaceDetails } from "@/app/types";
import axios from "axios";

const defaultCenter = {
    lat: 13.736717, // Default to Bangkok, Thailand
    lng: 100.523186,
};

export default function DiscoverPage() {
    const [selectedPlace, setSelectedPlace] = useState(defaultCenter);
    const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);

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

    return (
        <div className="flex flex-row h-screen">
            {/* Left Panel: Search and Place Details */}
            <div className="w-1/3 p-5 flex flex-col space-y-4">
                <PlaceSearchBox onSelect={fetchPlaceDetails} />

                {/* Show Place Details if available */}
                {placeDetails ? (
                    <div className="pt-5">
                        <h2 className="text-xl font-bold">{placeDetails.destName}</h2>
                        <p className="text-gray-600">{placeDetails.desc || "No description available."}</p>
                        <p><strong>Address:</strong> {placeDetails.address || "N/A"}</p>
                        <p><strong>Phone:</strong> {placeDetails.phoneNum || "N/A"}</p>
                        <p><strong>Rating:</strong> ⭐ {placeDetails.rating ?? "No rating"}</p>

                        {/* Photos */}
                        {placeDetails.photos && placeDetails.photos.length > 0 && (
                            <div className="mt-3 flex overflow-x-auto space-x-3">
                                {placeDetails.photos.map((photoUrl, index) => (
                                    <img key={index} src={photoUrl} alt="Destination" className="w-32 h-32 rounded-md object-cover" />
                                ))}
                            </div>
                        )}
                    </div>
                ) : null}

            </div>

            {/* Right Panel: Map View */}
            <div className="w-2/3 h-full">
                <MapView lat={selectedPlace.lat} lng={selectedPlace.lng} />
            </div>
        </div>
    );
}
