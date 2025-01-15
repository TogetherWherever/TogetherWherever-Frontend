'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BaseButton } from "@/app/components/buttons/BaseButton";
import { TripCard } from "@/app/components/cards/TripCard"
import { ReviewCard } from "@/app/components/cards/ReviewCard"
import { PlusIcon } from '@heroicons/react/24/solid';

const handleClick = () => {
    alert("Click!");
};

const start = new Date(2024, 2, 13);  // March 30, 2024
const end = new Date(2024, 2, 15);    // March 31, 2024

export default function Home() {
    const [mockLikeScore, setMockLikeScore] = useState(10);
    const router = useRouter();
    
    const handleNavigateTripPlanningPage = () => {
        router.push('home/create-new-trip')
    };

    return (
        <div className="flex flex-col py-2">
            <div>
                <div className="flex justify-between items-center">
                    <div className="text-extrabold text-4xl mb-4"> Recently viewed </div>
                    <BaseButton 
                        className="bg-moonstone-blue"
                        color="earth-yellow"
                        buttonTxt="New Trip" 
                        leftIcon={PlusIcon}
                        leftIconCustomization="w-[25px] h-[25px]"
                        onClick={handleNavigateTripPlanningPage}
                    />
                </div>
                <div className="flex gap-y-8 gap-x-2 mt-2">
                    <TripCard 
                        cardName="Trip to Chiang Mai"
                        profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                        image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
                        startDate={start}
                        endDate={end}
                        destinationsNumber={9}
                        onClick={handleClick}
                    />
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
            <div className="mt-8">
                <div className="text-extrabold text-4xl mb-6"> Recently viewed </div>
                <ReviewCard
                    cardName="Phuket, Thailand."
                    image="https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/http://images.ntmllc.com/v4/destination/Thailand/Phuket-City/220668_SCN_Phuket_iStock910551026_Z20B18/Phuket-City-Scenery.jpg?tr=w-780%2Ch-437%2Cfo-auto"
                    profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                    userName="Jane Doe"
                    desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus."
                    onClick={handleClick}
                    likeScore={mockLikeScore}
                    setLikeScore={setMockLikeScore}
                />
            </div>
            
        </div>
    );
}
