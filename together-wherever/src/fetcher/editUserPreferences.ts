import axios from 'axios';

export const editUserPreferences = async (username: string | undefined, preferences: string[]) => {
    if (preferences.length <= 3) {
        return;
    } else {
        const body = {
            username: username,
            preferences: preferences
        };

        try {
            const response = await axios.patch(`https://togetherwherever-backend.onrender.com/api/user-profile/update-preferences`, body);

            if (response.status !== 200) {
                throw new Error("Something wrong with recording recently view.");
            } else {
                return response.status;
            }
        } catch (error) {
            throw error;
        }
    }
};