'use client';

import { useState } from "react";
import PlaceSearchBox from "../components/PlaceSearchBox";

export default function DiscoverPage() {
    const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);

    return (
        <div className="px-40">
            <PlaceSearchBox onSelect={setSelectedPlace} />
        </div>
    );
}
