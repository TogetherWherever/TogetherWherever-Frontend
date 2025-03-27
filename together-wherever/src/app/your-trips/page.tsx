'use client';

import { BaseButton } from "@/components/buttons/BaseButton";
import { TripCard } from "@/components/cards/TripCard"
import { useYourTripData } from "@/hooks/useYourTripData";
import { YourTripDara } from "@/utils/types";
import { PlusIcon, MapPinIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid';
import { ClipLoader } from "react-spinners";

export default function YourTrips() {
    const {
        yoryTripData,
        router,
        handleNavigateTripPlanningPage,
        loading
    } = useYourTripData();

    const handleNavigateToDiscoverPage: () => void = () => {
        router.push('/discover');
    };

    if (loading || yoryTripData === null) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <ClipLoader size={50} color={"#60993E"} loading={loading} />
            </div>
        );
    }

    return (
        <>
            {yoryTripData?.length === 0 ? (
                <div className="flex flex-col justify-between px-12 pt-[50px] pb-6 gap-24">
                    <div className="flex flex-col gap-6">
                        <label className={"text-5xl font-bold text-asparagus-green"}>
                            Plan Your Perfect Trip
                        </label>
                        <label className={"text-2xl"}>
                            Whether traveling with friends or on your own, your next adventure starts here!
                        </label>
                    </div>

                    <div className="flex w-full mt-auto">
                        <div className="flex items-center flex-col gap-6 w-full pr-4">
                            <MapPinIcon className="w-[100px] text-earth-yellow" />
                            <BaseButton
                                className="bg-asparagus-green"
                                color="earth-yellow"
                                buttonTxt="New Trip"
                                leftIcon={PlusIcon}
                                leftIconCustomization="w-[25px] h-[25px]"
                                onClick={handleNavigateTripPlanningPage}
                            />
                            <label className="text-xl text-center px-24">
                                Start by adding your travel companions and preferences to design the perfect trip for everyone.
                            </label>
                        </div>

                        <div className="flex justify-center items-center flex-col gap-6 w-full">
                            <GlobeAsiaAustraliaIcon className="w-[100px] text-earth-yellow" />
                            <BaseButton
                                className="bg-asparagus-green"
                                color="earth-yellow"
                                buttonTxt="Explore Attractions"
                                onClick={handleNavigateToDiscoverPage}
                            />
                            <label className="text-xl text-center px-24">
                                Browse and explore top places to visit in your destination—perfect for solo travelers or inspiration for group trips.
                            </label>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="px-[150px] pt-[50px]">
                        <div className="flex flex-col py-2">
                            <div className="flex justify-between items-center">
                                <div className="text-extrabold text-4xl mb-4"> Your Trips </div>
                                <BaseButton
                                    className="bg-moonstone-blue"
                                    color="earth-yellow"
                                    buttonTxt="New Trip"
                                    leftIcon={PlusIcon}
                                    leftIconCustomization="w-[25px] h-[25px]"
                                    onClick={handleNavigateTripPlanningPage}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-y-4 gap-x-2 mt-2 justify-items-center">
                                {yoryTripData?.map((item: YourTripDara, index: number) => (
                                    <div
                                        key={item.tripId}
                                        className={`w-[400px] ${index % 3 === 0 ? "justify-self-start" :
                                            index % 3 === 1 ? "justify-self-center" :
                                                "justify-self-end"
                                            }`}
                                    >
                                        <TripCard
                                            key={item.tripId} // ✅ React uses this for list rendering
                                            tripId={item.tripId}
                                            owner={item.owner}
                                            cardName={item.tripName}
                                            image={item.photo}
                                            startDate={new Date(item.startDate)}
                                            endDate={new Date(item.endDate)}
                                            destinationsNumber={item.destinationsNumber}
                                            onClick={() => router.push(`/planning/${item.tripId}`)}
                                        />
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>

                </>
            )}
        </>

    );
}