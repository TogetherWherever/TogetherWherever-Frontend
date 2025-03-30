"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/fetcher/login";
import { toast } from "react-toastify";

export const useLogin = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const showError = () => {
        toast.error("Login failed, please try again.");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await login(formData.username, formData.password);
            localStorage.setItem("token", res.data.access_token);
            router.push("/");
        } catch (error: any) {
            showError();
        }
    };

    return {
        showPassword,
        setShowPassword,
        handleChange,
        handleSubmit
    };
};