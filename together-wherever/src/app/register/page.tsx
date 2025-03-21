"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { preferences } from "@/utils/preferences";
import { formatPreference } from "@/utils/format-preferences";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        preferences: [] as string[]
    });
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // Handle input changes for text fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle the preference toggle (select/deselect)
    const handlePreferenceChange = (pref: string) => {
        setFormData((prev) => ({
            ...prev,
            preferences: prev.preferences.includes(pref)
                ? prev.preferences.filter((p) => p !== pref)
                : [...prev.preferences, pref]
        }));
    };

    // Password validation
    const isValidPassword = (password: string) => {
        return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidPassword(formData.password)) {
            alert("Password must be at least 8 characters long and contain both letters and numbers.");
            return;
        }

        if (formData.preferences.length < 3) {
            alert("Please select at least 3 preferences.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/api/auth/register", formData);
            alert("Registration successful! Please login.");
            router.push("/login");
        } catch (error: any) {
            alert(error.response?.data?.detail || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center text-earth-yellow">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Username, email, first name, last name */}
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                    <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                    <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />

                    {/* Password Field */}
                    <div className="relative w-full">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 flex items-center text-gray-500">
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Travel Preferences */}
                    <div>
                        <div className="flex flex-row items-baseline pb-2">
                            <p className="text-lg font-semibold">Travel Preferences</p>
                            <p className="text-sm pl-2 text-gray-500">Please select at least 3 preferences</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {preferences.map((pref) => (
                                <label
                                    key={pref}
                                    onClick={() => handlePreferenceChange(pref)} // Handle toggle on click
                                    className={`cursor-pointer items-center space-x-2 p-2 rounded-lg ${
                                        formData.preferences.includes(pref)
                                            ? "bg-asparagus-green text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    <span>{formatPreference(pref)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-moonstone-blue text-white p-2 rounded-xl hover:bg-teal-blue transition">
                        Register
                    </button>
                </form>
                <p className="text-center text-sm">
                    Already have an account? <Link href="/login" className="text-moonstone-blue hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}
