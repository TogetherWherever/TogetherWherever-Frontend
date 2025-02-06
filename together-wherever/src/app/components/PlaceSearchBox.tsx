"use client";

import { useRef } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function PlaceSearchBox({ onSelect }: { onSelect: (placeId: string) => void }) {
    const inputRef = useRef<google.maps.places.SearchBox | null>(null);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Use env variable
        libraries: ["places"],
    });

    const handleOnPlacesChanged = () => {
        if (inputRef.current) {
            const places = inputRef.current.getPlaces();
            if (places && places[0].place_id) {
                onSelect(places[0].place_id); // Pass the place_id to the parent component
            }
        }
    };

    return isLoaded? (
        <div className="relative">
            {/* Magnifying Glass Icon */}
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />

            {isLoaded && (
                <StandaloneSearchBox
                    onLoad={(ref) => (inputRef.current = ref)}
                    onPlacesChanged={handleOnPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search for a destination..."
                        className="w-full p-3 pl-10 border bg-earth-yellow-light rounded-full focus:outline-none focus:ring-2 focus:ring-earth-yellow"
                    />
                </StandaloneSearchBox>
            )}
        </div>
    ): (
        <div>
            Loading Search Bar...
        </div>
    );
};
