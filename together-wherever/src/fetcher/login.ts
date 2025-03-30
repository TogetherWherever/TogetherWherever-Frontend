import axios from "axios";

export const login = async (username: string, password: string) => {
    try {
        const res = await axios.post("https://togetherwherever-backend.onrender.com/api/auth/login/token", new URLSearchParams({
            username: username,
            password: password
        }));

        return res
    } catch (error: any) {
        throw new Error(error);
    }
};