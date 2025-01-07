import type { Metadata } from "next";
import { Poppins } from "@next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const poppins = Poppins({
    subsets: ["latin"],
    variable: "--font-poppins",
    weight: ["400", "700"], // Regular and Bold
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={poppins.variable}>
                <NavBar />
                <div className="px-[150px] pt-[50px]">
                    {children}
                </div>
            </body>
        </html>
    );
}
