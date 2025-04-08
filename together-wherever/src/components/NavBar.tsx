'use client'; // Mark this as a Client Component

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { BaseButton } from "@/components/buttons/BaseButton";
import { jwtDecode } from 'jwt-decode';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function NavBar() {
    const pathname = usePathname();
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/', label: 'Home' },
        { href: '/discover', label: 'Discover' },
        { href: '/your-trips', label: 'Your Trips' },
    ];

    const handleNavigateToSignInPage = () => {
        router.push("/login");
    };

    const handleNavigateToProfilePage = () => {
        if (username !== undefined) {
            router.push(`/profile/${encodeURIComponent(username)}`);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUsername(decoded.sub);
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        } else {
            setUsername(undefined); // Reset username if token is removed
        }

        const handleStorageChange = () => {
            const newToken = localStorage.getItem('token');
            if (!newToken) {
                setUsername(undefined);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [pathname]);

    return (
        <nav className="flex items-center px-10 py-4 shadow-md z-40">
            <Image src="/logo.png" alt="Logo" width={1000} height={1000} className="h-10 w-auto pr-4" />
            <div className="hidden md:flex space-x-6 items-center">
                {links.map((link) => (
                    <Link
                        href={link.href}
                        key={link.label}
                        className={`px-4 text-lg ${(() => {
                            const isExactMatch = pathname === link.href;
                            const isHighlightedPath = () => {
                                if (pathname.startsWith('/home')) {
                                    return '/'
                                } else if (pathname.startsWith('/discover')) {
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
            </div>

            <div className="md:hidden flex items-center justify-center">
                <button onClick={() => setIsOpen(true)} className="md:hidden p-2">
                    <Bars3Icon className="w-6 h-6" />
                </button>
            </div>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 md:hidden">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <DialogPanel className="fixed inset-y-0 right-0 w-3/4 bg-white p-6 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                        <DialogTitle className="text-xl font-bold">Menu</DialogTitle>
                        <button onClick={() => setIsOpen(false)}>
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                        {links.map((link) => (
                            <Link
                                href={link.href}
                                key={link.label}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 text-lg ${(() => {
                                    const isExactMatch = pathname === link.href;
                                    const isHighlightedPath = () => {
                                        if (pathname.startsWith('/home')) {
                                            return '/'
                                        } else if (pathname.startsWith('/discover')) {
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
                    </nav>
                </DialogPanel>
            </Dialog>



            {username === null ? null : username ? (
                <div
                    className="flex flex-row ml-auto text-lg font-semibold text-asparagus-green cursor-pointer"
                    onClick={handleNavigateToProfilePage}
                >
                    <p className='mr-1'>Hi!,</p><p>{username}</p>
                </div>
            ) : (
                <div className='flex flex-row ml-auto'>
                    <BaseButton
                        buttonTxt="Sign in"
                        onClick={handleNavigateToSignInPage}
                        className='!text-base !py-2 !px-4'
                    />
                </div>
            )}
        </nav>
    );
}