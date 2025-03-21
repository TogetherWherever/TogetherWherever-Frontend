'use client';

import axios from "axios";
import { CreateNewTripBodyInterface } from "@/utils/types";
import { mockUsersData } from "@/mocks/create-new-trip";

// simulate fetching users data
export const fetchingUsersData = () => {
    try {

        // const response = await axios.get('/api/getUsersData');
        // if (response.status === 200) {
        //     const { usersData } = response.data;
        //     return usersData;
        // } else {
        //     throw new Error(`Unexpected response status: ${response.status}`);
        // }

        const allUsersData = mockUsersData;

        return allUsersData;

    } catch (error) {
        console.error("Error fetching voting page data:", error);
        throw error;
    }
};

export const createNewTrip = async (body: CreateNewTripBodyInterface) => {
    try {
        const response = await axios.post('http://localhost:8000/api/create-new-trip/', body);

        // Handle successful response
        alert(`Trip created successfully with ID: ${response.data.trip_id}`);
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
