import axios from 'axios';

export const fetxhUserProfileData = async(username: string | undefined) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/user-profile/?username=${username}`);
        if (response.status === 200) {
    
            return response.data;
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
};