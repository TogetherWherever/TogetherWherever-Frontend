"use client";

import { GoogleMap, Marker, OverlayView, useJsApiLoader } from "@react-google-maps/api";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface MapProps {
    lat: number;
    lng: number;
    makers?: {
        lat: number;
        lng: number;
        name?: string;
        status?: string;
    }[];
}

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

export default function MapView({ lat, lng, makers }: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["places"],
    });
    const pathname = usePathname();
    const isDiscoverPage = pathname.includes("/discover");

    return isLoaded ? (
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={{ lat, lng }}>
            {makers &&
                makers.map((maker, index) => (
                    <div key={index}>
                        {/* Marker */}
                        <Marker position={{ lat: maker.lat, lng: maker.lng }} />

                        {/* Custom Label Above Marker */}
                        <OverlayView
                            position={{ lat: maker.lat, lng: maker.lng }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div className={clsx("text-white font-bold", isDiscoverPage ? "" : "marker-label", maker.status === "complete" ? "complete" : "voting")}>{maker.name}</div>
                        </OverlayView>
                    </div>
                ))}
        </GoogleMap>
    ) : (
        <div className="w-full h-full flex justify-center items-center">Loading Map...</div>
    );
}
