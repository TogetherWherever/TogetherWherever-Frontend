'use client'; // Mark this as a Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/destination-detail', label: 'Destination' },
        { href: '/your-trips', label: 'Your Trips' },
    ];

    return (
        <nav className="flex items-center px-10 py-4 shadow-md">
            <Link href="/">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto pr-4" />
            </Link>
            {links.map((link) => (
                <Link href={link.href}key={link.label} className={`px-4 text-lg ${pathname === link.href ? 'text-earth-yellow font-bold' : ''}`}>
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}