'use client';

import axios from "axios";

interface CreateNewTripBodyInterface {
  owner: string;
  trip_name: string;
  dest_id: number;
  dest_name: string;
  start_date: Date;
  end_date: Date;
  duration: number;
  companion: string;
};

export const createNewTrip = async (body: CreateNewTripBodyInterface) => {
  try {
    const response = await axios.post('/api/create-new-trip/', body);

    // Handle successful response
    alert(`Trip created successfully with ID: ${response.data.trip_id}`);
    console.log(response)
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
