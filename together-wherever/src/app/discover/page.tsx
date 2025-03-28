'use client';

import { MapPinIcon, PhoneIcon, StarIcon, CheckIcon } from "@heroicons/react/24/solid";

import PlaceSearchBox from "@/components/PlaceSearchBox";
import MapView from "@/components/Map";
import { NearbyCard } from "@/components/cards/NearbyCard";

import { useBaseDiscoverPage } from "@/hooks/discover-page/useBaseDiscoverPage";

export default function DiscoverPage() {
    const {
        selectedPlace,
        placeDetails,
        formatString, 
        getDiscoverPageDetails,
    } = useBaseDiscoverPage();

    return (
        <div className="flex flex-row h-screen">
            {/* Left Panel: Search and Place Details */}
            <div className="w-3/5 p-5 flex flex-col space-y-4">
                <PlaceSearchBox onSelect={getDiscoverPageDetails}/>

                {/* Show Place Details if available */}
                {placeDetails ? (
                    <div className="overflow-auto">
                        <div className="flex flex-col pt-5 divide-y-2 divide-bistre">
                            <div>
                                <h2 className="text-3xl font-bold text-asparagus-green">{placeDetails.destName}</h2>
                                {placeDetails.destType && (
                                    <span className="py-2 flex flex-row">
                                        {placeDetails.destType.map((type, index) => (
                                            <p key={index} className="">{formatString(type)} |&nbsp;</p>
                                        ))}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col space-y-2 pt-2">
                                <p>{placeDetails.desc || ""}</p>
                                <span className="flex flex-row"><StarIcon className="w-5 h-5"/><p
                                    className="pl-2">{placeDetails.rating || "No rating"}</p></span>
                                <span className="flex flex-row"><MapPinIcon className="w-5 h-5"/><p
                                    className="pl-2">{placeDetails.address || "-"}</p></span>
                                <span className="flex flex-row"><PhoneIcon className="w-5 h-5"/><p
                                    className="pl-2">{placeDetails.phoneNum || "-"}</p></span>
                                <span className="flex flex-row"><StarIcon className="w-5 h-5"/><p
                                    className="pl-2">{placeDetails.rating || "No rating"}</p></span>
                                <div className="flex flex-col">
                                    <p className="">Facilities</p>
                                    <div className="flex flex-row">
                                        {placeDetails.fac.goodForChildren && (
                                            <span className="flex flex-row"><CheckIcon className="w-4 h-4"/><p
                                                className="px-1 text-sm">Good for Children</p></span>
                                        )}
                                        {placeDetails.fac.accessibility && (
                                            <>
                                                {placeDetails.fac.accessibility.wheelchairAccessibleParking && (
                                                    <span className="flex flex-row"><CheckIcon className="w-4 h-4"/><p
                                                        className="px-1 text-sm">Wheelchair Parking</p></span>
                                                )}
                                                {placeDetails.fac.accessibility.wheelchairAccessibleEntrance && (
                                                    <span className="flex flex-row"><CheckIcon className="w-4 h-4"/><p
                                                        className="px-1 text-sm">Wheelchair Entrance</p></span>
                                                )}
                                                {placeDetails.fac.accessibility.wheelchairAccessibleRestroom && (
                                                    <span className="flex flex-row"><CheckIcon className="w-4 h-4"/><p
                                                        className="px-1 text-sm">Wheelchair Restroom</p></span>
                                                )}
                                                {placeDetails.fac.accessibility.wheelchairAccessibleSeating && (
                                                    <span className="flex flex-row"><CheckIcon className="w-4 h-4"/><p
                                                        className="px-1 text-sm">Wheelchair Seating</p></span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* Photos */}
                                <p>Photos</p>
                                {placeDetails.photos && placeDetails.photos.length > 0 && (
                                    <div className="mt-3 flex overflow-x-auto space-x-3">
                                        {placeDetails.photos.map((photoUrl, index) => (
                                            <img key={index} src={photoUrl} alt="Destination"
                                                 className="h-32 rounded-md object-cover"/>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-asparagus-green">Related Destinations</h2>
                        <div className="flex flex-col">
                            <div className="grid grid-cols-2 gap-4">
                                {placeDetails.nearbyPlaces.map((place) => (
                                    <NearbyCard key={place.destID} place={place} onSelect={getDiscoverPageDetails}/>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* Right Panel: Map View */}
            <div className="w-2/5 h-full">
                <MapView lat={selectedPlace.lat} lng={selectedPlace.lng}
                    makers={[{lat: selectedPlace.lat, lng: selectedPlace.lng}]}/>
            </div>
        </div>
    );
}
