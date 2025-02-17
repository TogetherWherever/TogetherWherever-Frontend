import { BaseCard } from "@/app/components/cards/BaseCard"
import { NearbyPlaces } from "@/app/types";

interface NearbyCardProps {
    place: NearbyPlaces;
    width?: number;
    height?: number;
    onSelect: (placeId: string) => void;
}

export const NearbyCard = ({ place, width=400, height=300, onSelect }: NearbyCardProps) => {
    return (
        <BaseCard
            image={place.photos}
            cardName={place.destName}
            width={width}
            height={height}
            onClick={() => onSelect(place.destID)}
            className={"rounded-2xl w-[400px] h-[300px]"}
        />
    );
};
