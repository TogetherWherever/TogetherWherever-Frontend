import Image from "next/image";
import noImg from '@/image/noImg.png';
import clsx from "clsx";

interface BaseCardPropsInterface {
    image: string;
    width?: number;
    height?: number;
    cardName: string;
    onClick?: () => void;
    className?: string;
};

export const BaseCard = ({ image, width = 400, height = 300, cardName, onClick, className = "rounded-2xl" }: BaseCardPropsInterface) => {        
    const pic = image === "" ? noImg : image;

    return (
        <div className="relative cursor-pointer" onClick={onClick}>
            <Image
                className={className}
                src={pic}
                alt="img"
                width={width}
                height={height}
                style={{ objectFit: "cover" }}
            />
            <div className="w-full absolute bottom-0 left-0 px-2 py-3">
                <h2 className={clsx("text-lg font-semibold", image === "" ? "text-gray-400" : "text-mint-cream")}>
                    {cardName}
                </h2>
            </div>
        </div>
    );
};