import axios from 'axios';

export const fetchRecentlyView = async (username: string | undefined) => {
    try {
        const res = await axios.get(`https://togetherwherever-backend.onrender.com/api/recently-view/?username=${username}`);

        if (res.status === 200) {
            return res.data;
        } else {
            throw new Error("Something wrong with requesting recently view data.");
        }
    } catch (error) {
        console.log(error);
        throw error
    }
};