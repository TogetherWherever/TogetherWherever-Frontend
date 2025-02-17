import Image from "next/image";

interface BaseCardPropsInterface {
    image: string;
    width?: number;
    height?: number;
    cardName: string;
    onClick?: () => void;
};

export const BaseCard = ({ image, width = 400, height = 300, cardName, onClick }: BaseCardPropsInterface) => {
    return (
        <div className="relative cursor-pointer h-[300px]" onClick={onClick}>
            <Image
                className="rounded-2xl"
                src={image}
                alt="img"
                width={width}
                height={height}
            />
            <div className="w-full absolute bottom-0 left-0 px-2 py-3">
                <h2 className="text-3xl text-mint-cream font-semibold">
                    {cardName}
                </h2>
            </div>
        </div>
    );
};