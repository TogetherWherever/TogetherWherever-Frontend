// import axios from 'axios';

import { mockTripDetailData } from "@/mocks/trip-detail-data";

export const fetchTripDetail = async(tripId: string | string[]) => {
    try {
        // const response = await axios.get(`/api/get-trip-details/${tripId}`);
        // if (response.status === 200) {
        //     const { tripDetails } = response.data;

        //     return tripDetails;
        // } else {
        //     throw new Error(`Unexpected response status: ${response.status}`);
        // }

        return mockTripDetailData;
    } catch (error) {
        throw error;
    }
};