'use client';

import { usePathname, useRouter } from "next/navigation";
import { BaseButton } from "@/app/components/buttons/BaseButton";
import { PlusIcon } from '@heroicons/react/24/solid';
import { useState } from "react";
import { TripCard } from "@/app/components/cards/TripCard"

const handleClick = () => {
    alert("Click!");
};

const start = new Date(2024, 2, 13);  // March 30, 2024
const end = new Date(2024, 2, 15);    // March 31, 2024

export default function YourTrips() {
    const [mockLikeScore, setMockLikeScore] = useState(10);
    const router = useRouter();
    const pathName = usePathname();

    const handleNavigateTripPlanningPage = () => {
        router.push(`${pathName}/create-new-trip`)
    };

    return (
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
                <div className="grid grid-cols-3 mt-2 w-full gap-y-8 gap-x-2">
                    <div className="flex ">
                        <TripCard
                            cardName="Trip to Chiang Mai"
                            profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                            image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
                            startDate={start}
                            endDate={end}
                            destinationsNumber={9}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="flex justify-center">
                        <TripCard
                            cardName="Trip to Chiang Mai"
                            profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                            image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
                            startDate={start}
                            endDate={end}
                            destinationsNumber={9}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="flex justify-end">
                        <TripCard
                            cardName="Trip to Chiang Mai"
                            profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                            image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
                            startDate={start}
                            endDate={end}
                            destinationsNumber={9}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="flex">
                        <TripCard
                            cardName="Trip to Chiang Mai"
                            profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                            image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
                            startDate={start}
                            endDate={end}
                            destinationsNumber={9}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="flex justify-center">
                        <TripCard
                            cardName="Trip to Chiang Mai"
                            profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                            image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
                            startDate={start}
                            endDate={end}
                            destinationsNumber={9}
                            onClick={handleClick}
                        />
                    </div>
                    <div className="flex justify-end">
                        <TripCard
                            cardName="Trip to Chiang Mai"
                            profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                            image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
                            startDate={start}
                            endDate={end}
                            destinationsNumber={9}
                            onClick={handleClick}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}