'use client';

import Image from "next/image";
import { BaseCard } from "@/app/components/cards/BaseCard"
import { useState } from 'react';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';


interface ReviewCardPropsInterface {
    image: string;
    profileImage: string;
    userName: string;
    likeScore: number;
    setLikeScore: React.Dispatch<React.SetStateAction<number>>;
    desc?: string;
    cardName: string;
    onClick?: () => void;

};

export const ReviewCard = ({ image, profileImage, userName, likeScore, setLikeScore, desc, cardName, onClick }: ReviewCardPropsInterface) => {
    const [likeClick, setLikeClick] = useState<boolean>(false);
    const renderHeartIcon = !likeClick ? (
        <OutlineHeartIcon className="w-[25px] h-[25px]" />
    ) : (
        <SolidHeartIcon className="w-[25px] h-[25px] text-red-500" />
    );

    const handleClickLike = () => {
        setLikeClick((prevState) => !prevState);
        setLikeScore((currentScore: number) => currentScore + (likeClick ? -1 : 1));
    };

    return (
        <div className="flex flex-col items-center max-w-[400px]">
            <BaseCard cardName={cardName} image={image} onClick={onClick} />
            <div className="mt-3 flex flex-col justify-center items-center w-full">
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
                    <div className="flex justify-between">
                        <button onClick={handleClickLike}>
                            {renderHeartIcon}
                        </button>
                        <div className="flex min-w-[25px] justify-end">{likeScore}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};