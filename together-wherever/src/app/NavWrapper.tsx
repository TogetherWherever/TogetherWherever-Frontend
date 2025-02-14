"use client"; // Ensure this is a Client Component

import { usePathname } from "next/navigation";
import NavBar from "./components/NavBar";

export default function NavWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    
    // Hide NavBar and adjust padding for /planning/*
    const isPlanningPage = pathname.startsWith("/planning");

    return (
        <>
            {!isPlanningPage && <NavBar />}
            <div className={isPlanningPage ? "px-0 pt-0" : "px-[150px] pt-[50px]"}>
                {children}
            </div>
        </>
    );
}
