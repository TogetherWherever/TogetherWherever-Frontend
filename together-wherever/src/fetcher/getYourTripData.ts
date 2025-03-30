import axios from 'axios';

export const fetchGetYourTripsData = async (username: string | undefined) => {
    try {
        const res = await axios.get(`http://localhost:8000/api/your-trips/?username=${username}`);
        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error("Something wrong with YourTrip Data Endpoint.");
        }
    } catch (error) {
        throw error;
    }
};