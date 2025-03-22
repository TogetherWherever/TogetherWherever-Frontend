'use client';

import axios from "axios";
import { CreateNewTripBodyInterface } from "@/app/utils/types";


export const createNewTrip = async (body: CreateNewTripBodyInterface) => {
    try {
        const response = await axios.post('http://localhost:8000/api/create-new-trip/', body);

        // Handle successful response
        alert(`Trip created successfully with ID: ${response.data.trip_id}`);
        return response.data;
    } catch (error: any) {
        // Handle error response
        if (error.response) {
            // Server responded with a status other than 2xx
            alert(`Error: ${error.response.data.detail}`);
        } else if (error.request) {
            // No response was received
            alert('Error connecting to the server');
        } else {
            // Something else happened
            alert(`Error: ${error.message}`);
        }
        throw error;
    }
};
