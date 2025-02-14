'use client'; // Mark this as a Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode';

export default function NavBar() {
    const pathname = usePathname();
    const [username, setUsername] = useState('');
    

    const links = [
        { href: '/', label: 'Home' },
        { href: '/discover', label: 'Discover' },
        { href: '/your-trips', label: 'Your Trips' },
    ];


    useEffect(() => {        
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.sub);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [pathname]);

    return (
        <nav className="flex items-center px-10 py-4 shadow-md z-40">
                <Image src="/logo.png" alt="Logo" width={1000} height={1000} className="h-10 w-auto pr-4" />
            {links.map((link) => (
                <Link 
                    href={link.href} 
                    key={link.label} 
                    className={`px-4 text-lg ${(() => {
                        const isExactMatch = pathname === link.href;                        
                        const isHighlightedPath = () => {
                            if (pathname.startsWith('/home')) {
                                return '/'
                            } 
                            else if (pathname.startsWith('/discover')) { 
                                return '/discover'
                            } else {
                                return '/your-trips'
                            }
                        }
                        const isCreatingNewTrip = pathname.includes("/create-new-trip");
                    
                        return isExactMatch || isCreatingNewTrip && isHighlightedPath() === link.href
                          ? "text-earth-yellow font-bold"
                          : "";
                    })()}`}>
                    {link.label}
                </Link>
            ))}
            {username && (
                <div className="flex flex-row ml-auto text-lg font-semibold text-asparagus-green">
                    <p>Hi!,</p><p>{ username }</p>
                </div>
            )}
        </nav>
    );
}