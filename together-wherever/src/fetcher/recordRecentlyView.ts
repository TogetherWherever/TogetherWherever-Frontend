import axios from 'axios';

type RecordRecentlyViewType = {
    username: string | undefined;
    view_trip_id: number | undefined;
};

export const recordRecentlyView = async ({username, view_trip_id}: RecordRecentlyViewType) => {
    try {
        const res = await axios.post(`https://togetherwherever-backend.onrender.com/api/recently-view/?username=${username}&view_trip_id=${view_trip_id}`);

        if (res.status !== 200) {
            throw new Error("Something wrong with recording recently view.");
        };
    } catch (error) {
        throw error;
    }    
}; 