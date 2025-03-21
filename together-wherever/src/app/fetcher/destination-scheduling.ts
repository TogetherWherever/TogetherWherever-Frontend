'use client';

// import axios from "axios";

interface UpdateDestinationParams {
    action: "move" | "reorder";
    destinationID: string;
    fromCategory: "morning" | "afternoon" | "night";
    toCategory?: "morning" | "afternoon" | "night" | null;
    newIndex?: number | null;
    tripDate: Date;
    tripId: string | string[] | undefined;
}

export async function updateDestination({
    action,
    destinationID,
    fromCategory,
    toCategory = null,
    newIndex = null,
    tripDate,
    tripId
}: UpdateDestinationParams) {
    try {
        // Prepare the request body
        const body = JSON.stringify({
            tripDate,
            tripId,
            action,
            destinationID,
            fromCategory,
            toCategory,
            newIndex
        });

        // Uncomment when connecting to a real API
        // const response = await axios.patch("end-point", body);
        // const updatedDestinations = await response.data;

        // Simulating the update response as a log
        const updatedDestinations = {
            tripDate,
            tripId,
            action,
            destinationID,
            fromCategory,
            toCategory,
            newIndex
        };

        return updatedDestinations;
    } catch (error: any) {
        return null;
    }
};
