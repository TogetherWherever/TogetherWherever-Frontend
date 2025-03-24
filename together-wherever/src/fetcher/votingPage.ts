import axios from 'axios';
import { DestinationInterface, TripDetailsInterface } from "@/utils/types";

// Simulate an actual API call
export const fetchVotingPageData = async (tripId: string | string[], day: string | null, username: string | string[]): Promise<{
    tripDetails: TripDetailsInterface;
    destinations: DestinationInterface[];
    scores: Record<string, number>;
}> => {
    try {

        const response = await axios.get(`http://localhost:8000/api/vote/vote-details?trip_id=${tripId}&day_number=${day}&username=${username}`);
        if (response.status === 200) {
            const data = response.data;
            const tripDetails = data;
            const destinations = data.destinations

            // Initialize scores for each destination
            const scores = Object.fromEntries(
                destinations.map((dest: { destID: number }) => [dest.destID, 0])
            );

            return {
                tripDetails,
                destinations,
                scores
            };
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }        
    } catch (error) {
        console.error("Error fetching voting page data:", error);
        throw error;
    }
};
