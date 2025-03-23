"use client";

import Link from "next/link";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
    const {
        showPassword,
        setShowPassword,
        handleChange,
        handleSubmit
    } = useLogin();

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center text-earth-yellow">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />

                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-lg focus:outline-moonstone-blue"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 flex items-center text-gray-500">
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    <button type="submit" className="w-full bg-moonstone-blue text-white p-2 rounded-xl hover:bg-teal-blue transition">
                        Login
                    </button>
                </form>
                <p className="text-center text-sm">
                    Do not have an account? <Link href="/register" className="text-moonstone-blue hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
}
