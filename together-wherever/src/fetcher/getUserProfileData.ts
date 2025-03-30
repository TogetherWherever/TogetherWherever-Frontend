import axios from 'axios';

export const fetxhUserProfileData = async(username: string | undefined) => {
    try {
        const response = await axios.get(`https://togetherwherever-backend.onrender.com/api/user-profile/?username=${username}`);
        if (response.status === 200) {
    
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
};