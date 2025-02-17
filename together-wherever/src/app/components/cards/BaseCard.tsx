import Image from "next/image";

interface BaseCardPropsInterface {
    image: string;
    width?: number;
    height?: number;
    cardName: string;
    onClick?: () => void;
    className?: string;
};

export const BaseCard = ({ image, width = 400, height = 300, cardName, onClick, className = "rounded-2xl" }: BaseCardPropsInterface) => {
    return (
        <div className="relative cursor-pointer" onClick={onClick}>
            <Image
                className={className}
                src={image}
                alt="img"
                width={width}
                height={height}
                style={{ objectFit: "cover" }}
            />
            <div className="w-full absolute bottom-0 left-0 px-2 py-3">
                <h2 className="text-3xl text-mint-cream font-semibold">
                    {cardName}
                </h2>
            </div>
        </div>
    );
};