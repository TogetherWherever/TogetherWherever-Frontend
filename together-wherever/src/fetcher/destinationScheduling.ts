'use client';

import axios from "axios";

interface UpdateDestinationParams {
    destinationID: string;
    action: string;
    tripDay: number | undefined;
    tripId: number | number[] | undefined;
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
        const body = {
            tripDay,
            tripId,
            destinationID,
            action,
            oldOrder,
            newOrder
        }
        
        const response = await axios.patch("https://togetherwherever-backend.onrender.com/api/planning-details/move-activities", body);

            if (response.status === 200) {
                return response.data;
            } else {
                console.log("something wrong");
            }

    } catch (error: any) {
        return console.log(error);
    }
};
