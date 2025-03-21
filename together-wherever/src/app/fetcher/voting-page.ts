// import axios from 'axios';
import { votingPageMockData } from "@/app/mocks/vote";
import { DestinationInterface, TripDetailsInterface } from "@/app/utils/voting-page";

// Simulate an actual API call
export const fetchVotingPageData = async (): Promise<{
    tripDetails: TripDetailsInterface | null;
    destinations: DestinationInterface[];
    scores: Record<string, number>;
}> => {
    try {

        // const response = await axios.get('/api/votingPageData');
        // if (response.status === 200) {
        //     const { tripDetails, destinations } = response.data;

        //     // Initialize scores for each destination
        //     const scores = Object.fromEntries(
        //         destinations.map((dest: { destID: number }) => [dest.destID, 0])
        //     );

        //     return {
        //         tripDetails,
        //         destinations,
        //         scores
        //     };
        // } else {
        //     throw new Error(`Unexpected response status: ${response.status}`);
        // }

        // using mock data
        const tripDetails = votingPageMockData;
        const destinations = votingPageMockData.destinations;
        const scores = Object.fromEntries(votingPageMockData.destinations.map((dest) => [dest.destID, 0]));

        return {
            tripDetails,
            destinations,
            scores
        };

    } catch (error) {
        console.error("Error fetching voting page data:", error);
        throw error;
    }
};
