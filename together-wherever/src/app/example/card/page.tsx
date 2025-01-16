'use client';

import { useState } from "react";
import { TripCard } from "@/app/components/cards/TripCard"
import { ReviewCard } from "@/app/components/cards/ReviewCard"


export default function ExampleButton () {  
  const [mockLikeScore, setMockLikeScore] = useState(0);

  const start = new Date(2024, 2, 13);  // March 30, 2024
  const end = new Date(2024, 2, 15);    // March 31, 2024
  
  return (
    <div className="grid grid-cols-2 p-4 gap-10">
      <TripCard 
        cardName="Trip to Chaing Mai"
        profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
        startDate={start}
        endDate={end}
        destinationsNumber={9}
      />
      <TripCard 
        cardName="Trip to Chaing Mai"
        profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        image="https://d3h1lg3ksw6i6b.cloudfront.net/media/image/2023/09/13/4969e4b8a93c41f6b1f2d161eaade88f_Chiang_Mai_Where_To_Eat_Drink_Stay_And_Play_In_The_Cultural_Capital_Of_Northern_Thaila.jpg"
        startDate={start}
        endDate={end}
        destinationsNumber={9}
      />
      <ReviewCard
        cardName="Phuket, Thailand."
        image="https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/http://images.ntmllc.com/v4/destination/Thailand/Phuket-City/220668_SCN_Phuket_iStock910551026_Z20B18/Phuket-City-Scenery.jpg?tr=w-780%2Ch-437%2Cfo-auto"
        profileImage="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
        userName="Jane Doe"
        desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia dolor in augue auctor, at euismod nisl placerat. Fusce ac erat sed felis consequat tempus."
        likeScore={mockLikeScore}
        setLikeScore={setMockLikeScore}
      />
    </div>
  );
};