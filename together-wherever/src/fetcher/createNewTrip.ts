'use client';

import axios from "axios";
import { CreateNewTripBodyInterface } from "@/utils/types";

// simulate fetching users data
export const fetchingUsersData = async (ownerName: string | undefined) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/get-users-data/?username=${ownerName}`);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }        
    } catch (error) {
        console.error("Error fetching voting page data:", error);
        throw error;
    }
};

export const createNewTrip = async (body: CreateNewTripBodyInterface) => {
    try {
        const response = await axios.post('http://localhost:8000/api/create-new-trip/', body);
        // Handle successful response        
        if (response.status === 200) {
            return response.data
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
        
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
    }
};
