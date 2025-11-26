import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ 
    subsets: ["latin"],
    variable: "--font-sans", 
});

export const metadata: Metadata = {
    title: "Captive Demand",
    description: "Dev Toolkit Built to Flex",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${inter.variable} font-sans antialiased h-full relative`}>
                <Navbar />
                <main>{children}</main>
            </body>
        </html>
    );
}
