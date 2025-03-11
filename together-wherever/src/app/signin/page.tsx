"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon }  from '@heroicons/react/24/outline'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
    });
    const router = useRouter();

    const toggleForm = () => setIsLogin(!isLogin);
    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isValidPassword = (password: string) => {
        return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isLogin && !isValidPassword(formData.password)) {
            alert('Password must be at least 8 characters long and contain both letters and numbers.');
            return;
        }

        try {
            if (isLogin) {
                const res = await axios.post('http://localhost:8000/api/auth/login/token', new URLSearchParams({
                    username: formData.username,
                    password: formData.password
                }));
                localStorage.setItem('token', res.data.access_token);
                router.push('/');
            } else {
                await axios.post('http://localhost:8000/api/auth/register', formData);
                alert('Registration successful! Please login.');
                setIsLogin(true);
            }
        } catch (error: any) {
            console.error('Auth error:', error.response?.data || error);
            alert(error.response?.data?.detail || 'Authentication failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center text-earth-yellow">{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                    {!isLogin && <>
                        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                    </>}
                    {/* Password Field with Toggle Button */}
                    <div className="relative w-full">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded-lg focus:outline-moonstone-blue" />
                        <button type="button" onClick={togglePassword} className="absolute inset-y-0 right-2 flex items-center text-gray-500">
                            {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                    <button type="submit" className="w-full bg-moonstone-blue text-white p-2 rounded-xl hover:bg-teal-blue transition">
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <p className="text-center text-sm">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={toggleForm} className="ml-1 text-moonstone-blue hover:underline">
                        {isLogin ? 'Register here' : 'Login here'}
                    </button>
                </p>
            </div>
        </div>
    );
}
