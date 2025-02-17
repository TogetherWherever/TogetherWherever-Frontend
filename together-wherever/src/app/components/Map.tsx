"use client";

import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";

interface MapProps {
    lat: number;
    lng: number;
    makers?: {
        lat: number;
        lng: number;
    }[];
}

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

export default function MapView({lat, lng, makers}: MapProps) {
    const {isLoaded} = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Use env variable
        libraries: ["places"],
    });

    return isLoaded ? (
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={{lat, lng}}>
            {makers &&
                makers.map((maker, index) => (
                    <Marker key={index} position={{lat: maker.lat, lng: maker.lng}}/>
                ))}
        </GoogleMap>
    ) : (
        <div className="w-full h-full flex justify-center items-center">
            Loading Map...
        </div>
    );
};