import axios from "axios";

export const login = async (username: string, password: string) => {
    try {
        const res = await axios.post("http://localhost:8000/api/auth/login/token", new URLSearchParams({
            username: username,
            password: password
        }));

        return res
    } catch (error: any) {
        throw new Error(error);
    }
};