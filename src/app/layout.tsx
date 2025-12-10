import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
    weight: ["400", "500", "600", "700", "800"],
});

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

const nohemi = localFont({
    src: "../../public/fonts/Nohemi-Light-BF6438cc5899919.ttf",
    variable: "--font-nohemi",
    weight: "300",
    display: "swap",
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
            <body className={`${inter.variable} ${syne.variable} ${jetBrainsMono.variable} ${nohemi.variable} antialiased h-full relative`}>
                <Navbar />
                <main className="relative z-10 bg-[#fafafa] w-full overflow-x-hidden">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
