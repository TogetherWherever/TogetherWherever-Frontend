export type NearbyPlaces = {
    destID: string;
    destName: string;
    photos: string;
}

type AccessibilityOptions = {
    wheelchairAccessibleParking: boolean,
    wheelchairAccessibleEntrance: boolean,
    wheelchairAccessibleRestroom: boolean,
    wheelchairAccessibleSeating: boolean
}

export type PlaceDetails = {
    destID: string;
    destName: string;
    destType?: string[];
    desc?: string;
    rating?: number;
    address?: string;
    phoneNum?: string;
    fac: {
        goodForChildren?: boolean;
        accessibility?: AccessibilityOptions;
    }
    photos?: string[];
    lat?: number;
    lon?: number;
    nearbyPlaces: NearbyPlaces[];
};

export interface DestinationDetailsProps {
    details: PlaceDetails;
}