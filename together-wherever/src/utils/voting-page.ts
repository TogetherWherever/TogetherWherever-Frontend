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