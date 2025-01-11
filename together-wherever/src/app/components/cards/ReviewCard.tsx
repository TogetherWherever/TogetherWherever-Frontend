'use client';

import Image from "next/image"; 
import { BaseCard } from "@/app/components/cards/BaseCard"
import { useState } from 'react';

interface ReviewCardPropsInterface {
  image: string;
  profileImage: string;
  userName: string;
  likeScore?: number;
  desc?: string;
  cardName: string;
  onClick?: () => void;
};

export const ReviewCard = ({image, profileImage, userName, likeScore=0, desc, cardName, onClick}: ReviewCardPropsInterface) => {
  const [likeClick, setLikeClick] = useState<boolean>(false);
  const renderHeartIcon = !likeClick ? "/heart-icon-white.svg" : "/heart-icon-red.svg"

  const handleClickLike = () => {
    setLikeClick(true)
  };

  return (
    <div className="flex flex-col">
      <BaseCard cardName={cardName} image={image} onClick={onClick}/>
      <div className="mt-3 flex flex-col justify-center items-center w-[400px]">
        <div className="text-dorado overflow-hidden text-ellipsis text-justify line-clamp-2">
          {desc}
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={profileImage}
              alt="img"
              width={50}
              height={50}
              objectFit="cover"
              className="rounded-full aspect-square object-cover mr-2"
            />
            <div className="ml-2"> {userName} </div>
          </div> 
          <div className="flex justify-between gap-2">
            <button onClick={handleClickLike}>
              <Image
                src={renderHeartIcon}
                alt="img"
                width={25}
                height={25}
              />
            </button>
            <div>{likeScore}</div>
          </div>         
        </div>
      </div>
    </div>
  );
};