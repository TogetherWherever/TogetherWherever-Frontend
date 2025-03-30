import axios from 'axios';

export const fetchGetYourTripsData = async (username: string | undefined) => {
    try {
        const res = await axios.get(`https://togetherwherever-backend.onrender.com/api/your-trips/?username=${username}`);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error("Something wrong with YourTrip Data Endpoint.");
        }
    } catch (error) {
        throw error;
    }
};