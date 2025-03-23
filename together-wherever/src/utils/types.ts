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
    owner: string | undefined;
    trip_name: string;
    dest_id: string;
    dest_name: string | undefined;
    lat: number;
    lon: number;
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

// planning page
interface Companion {
    username: string;
    profilePic: string;
}

interface OpeningHours {
    [day: string]: {
        open: string;
        close: string;
    };
}

interface Destination {
    destID: string;
    destName: string;
    photo: string;
    desc: string;
    openingHours: OpeningHours;
    lat: number;
    lng: number;
}

interface Distance {
    from: string;
    fromID: string;
    to: string;
    toID: string;
    distance_km: number;
    duration_min: number;
}

export interface TripDay {
    day: number;
    status: "complete" | "voting" | "pending";
    voted: boolean;
    distance?: Distance[];
    voted_dests?: {
        morning: Destination[];
        afternoon: Destination[];
        night: Destination[];
    };
    suitableDests?: Destination[];
    members_voted?: number;
    total_members?: number;
    user_voted?: boolean;
}

export interface TripDetail {
    tripName: string;
    startDate: Date;
    lastDate: Date;
    photo: string;
    lat: number;
    lng: number;
    companion: Companion[];
    trip_day: TripDay[];
}

