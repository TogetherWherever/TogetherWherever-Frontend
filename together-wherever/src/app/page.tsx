"use client";

import { useRouter } from "next/navigation";
import { BaseButton } from "@/components/buttons/BaseButton";
import { TripCard } from "@/components/cards/TripCard";
import { PlusIcon, MapPinIcon, GlobeAsiaAustraliaIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ClipLoader } from "react-spinners";
import { useHomePageData } from "@/hooks/useHomePageData";
import { RecentlyViewData } from "@/utils/types";
import ErrorReport from "@/components/ErrorReport";

export default function Home() {
    const { recentlyViewData, loading, token, error } = useHomePageData();
    const router = useRouter();

    const handleNavigateTripPlanningPage = () => router.push('home/create-new-trip');
    const handleNavigateToDiscoverPage = () => router.push('/discover');

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <ClipLoader size={50} color={"#60993E"} loading={loading} />
            </div>
        );
    } else if (error) {
        <div className="fixed inset-0 flex items-center justify-center">
            <ErrorReport />
        </div>
    }

    if (!token || recentlyViewData?.length === 0) {
        return (
            <div className="flex flex-col justify-between px-12 pt-[50px] pb-6 lg:gap-24 gap-10">
                <div className="flex flex-col gap-6">
                    <label className="lg:text-5xl text-3xl font-bold text-asparagus-green">Plan Your Perfect
                        Trip</label>
                    <label className="lg:text-2xl text-xl">
                        Whether traveling with friends or on your own, your next adventure starts here!
                    </label>
                </div>

                <div className="flex flex-col md:flex-row w-full mt-auto">
                    <div className="flex items-center flex-col gap-6 w-full pr-4">
                        <div className="flex items-center flex-col gap-6">
                            <MapPinIcon className="lg:w-[100px] w-[50px] text-earth-yellow" />
                            <BaseButton
                                className="bg-asparagus-green !text-lg"
                                color="earth-yellow"
                                buttonTxt="New Trip"
                                leftIcon={PlusIcon}
                                leftIconCustomization="w-[25px] h-[25px]"
                                onClick={handleNavigateTripPlanningPage}
                            />
                        </div>
                        <label className="lg:text-xl text-lg text-center lg:px-24">
                            Start by adding your travel companions and preferences to design the perfect trip for
                            everyone.
                        </label>
                    </div>

                    <div className="flex justify-center items-center flex-col gap-6 w-full">
                        <div className="flex items-center flex-col gap-6">
                            <GlobeAsiaAustraliaIcon className="lg:w-[100px] w-[50px] text-earth-yellow" />
                            <BaseButton
                                className="bg-asparagus-green !text-lg"
                                color="earth-yellow"
                                buttonTxt="Explore Attractions"
                                leftIcon={MagnifyingGlassIcon}
                                leftIconCustomization="w-[25px] h-[25px]"
                                onClick={handleNavigateToDiscoverPage}
                            />
                        </div>
                        <label className="lg:text-xl text-lg text-center lg:px-24">
                            Browse and explore top places to visit in your destination—perfect for solo travelers or
                            inspiration for group trips.
                        </label>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full px-[75px] px-[50px] pt-[50px] pb-6">
            <div className="w-full max-w-[1620px]">
                <div className="flex flex-col py-2">
                    <div className="xl:flex flex-row justify-between items-center">
                        <div className="flex flex-col gap-6">
                            <label className="lg:text-5xl text-3xl font-bold text-asparagus-green">Plan Your Perfect
                                Trip</label>
                            <label className="lg:text-2xl text-xl">
                                Whether traveling with friends or on your own, your next adventure starts here!
                            </label>
                        </div>
                        <BaseButton
                            className="bg-moonstone-blue mt-5 xl:mt-0 text-xl"
                            color="earth-yellow"
                            buttonTxt="New Trip"
                            leftIcon={PlusIcon}
                            leftIconCustomization="w-[25px] h-[25px]"
                            onClick={handleNavigateTripPlanningPage}
                        />
                    </div>
                    <div className="font-bold lg:text-4xl text-2xl lg:mt-12 mt-8 mb-4">Recently viewed</div>
                    <div className="grid xl:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-x-2 sm:gap-y-2 mt-2 justify-items-center">
                        {recentlyViewData?.map((item: RecentlyViewData, index: number) => (
                            <div
                                key={item.viewTripId}
                                className={`pt-2 lg:pt-0 ${index % 3 === 0
                                    ? "justify-self-start"
                                    : index % 3 === 1
                                        ? "2xl:justify-self-center xl:justify-self-end justify-self-start"
                                        : "2xl:justify-self-end justify-self-start"
                                    }`}
                            >                                
                                <TripCard
                                    tripId={item.viewTripId}
                                    owner={item.username}
                                    cardName={item.tripName}
                                    image={item.photo}
                                    startDate={new Date(item.startDate)}
                                    endDate={new Date(item.endDate)}
                                    destinationsNumber={item.destinationsNumber}
                                    onClick={() => router.push(`/planning/${item.viewTripId}`)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
