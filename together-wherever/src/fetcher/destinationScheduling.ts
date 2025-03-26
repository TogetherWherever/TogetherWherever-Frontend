'use client';

// import axios from "axios";

interface UpdateDestinationParams {
    destinationID: string;
    action: string;
    tripDay: string | undefined;
    tripId: string | string[] | undefined;
    oldOrder: number | undefined;
    newOrder: number | undefined;
}

export async function updateDestination({
    destinationID,
    action,
    tripDay,
    tripId,
    oldOrder,
    newOrder
}: UpdateDestinationParams) {
    try {
        // Prepare the request body
        const body = JSON.stringify({
            tripDay,
            tripId,
            destinationID,
            action,
            oldOrder,
            newOrder
        });

        // Uncomment when connecting to a real API
        // const response = await axios.patch("end-point", body);
        // const updatedDestinations = await response.data;

        // Simulating the update response as a log
        const updatedDestinations = {
            tripDay,
            tripId,
            destinationID,
            action,
            oldOrder,
            newOrder
        };

        return updatedDestinations;
    } catch (error: any) {
        return null;
    }
};
