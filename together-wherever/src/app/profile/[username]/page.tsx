'use client';

import { useParams, useRouter } from "next/navigation";
import { BaseButton } from "@/app/components/buttons/BaseButton";

export default function Profile() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event("storage"));
        router.push('/');
    };

    const { username } = useParams();
    const decodedUsername = decodeURIComponent(username as string);

    return (
        <div className="flex flex-row justify-between w-full">
            <p> {decodedUsername} </p>
            <BaseButton 
                buttonTxt="Logout" 
                onClick={handleLogout}
                className='!text-base !text-white !py-2 !px-4 !bg-red'
            />              
        </div>
    );
}