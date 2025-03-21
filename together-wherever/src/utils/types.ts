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
};

export interface CreateNewTripBodyInterface {
    owner: string;
    trip_name: string;
    dest_id: string;
    dest_name: string;
    start_date: string;
    end_date: string;
    duration: number;
    companion: string;
};

export interface DestinationInterface {
    destID: string;
    destName: string;
    photo: string;
};

export interface TripDetailsInterface {
    trip_id: string;
    tripName: string;
    photo: string;
    startDate: Date;
    lastDate: Date;
    voting_date: Date;
    members_voted: number;
    total_members: number;
    companion: { username: string; profilePic: string }[];
    destinations: DestinationInterface[];
};