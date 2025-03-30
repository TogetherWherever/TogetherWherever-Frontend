import axios from 'axios';

export const fetchTripDetail = async(tripId: string | string[], username: string | undefined) => {
    try {
        const response = await axios.get(`https://togetherwherever-backend.onrender.com/api/planning-details/?trip_id=${tripId}&username=${username}`);
        if (response.status === 200) {
    
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
};