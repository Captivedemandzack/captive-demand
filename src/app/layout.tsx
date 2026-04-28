import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { OrganizationSchema } from "@/components/schema/OrganizationSchema";
import { siteConfig } from "@/lib/site";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const syne = Syne({
    subsets: ["latin"],
    variable: "--font-syne",
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

const nohemi = localFont({
    src: "../../public/fonts/Nohemi-Light-BF6438cc5899919.ttf",
    variable: "--font-nohemi",
    weight: "300",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.defaultTitle,
        template: siteConfig.titleTemplate,
    },
    description: siteConfig.description,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        siteName: siteConfig.name,
        locale: "en_US",
        url: "/",
        title: siteConfig.defaultTitle,
        description: siteConfig.description,
        images: [
            {
                url: "/opengraph.png",
                width: 1200,
                height: 628,
                alt: siteConfig.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.defaultTitle,
        description: siteConfig.description,
        images: ["/opengraph.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body className={`${inter.variable} ${syne.variable} ${jetBrainsMono.variable} ${nohemi.variable} antialiased h-full relative`}>
                <GoogleTagManager />
                <OrganizationSchema />
                <Navbar />
                <main className="relative z-10 bg-[#fafafa] w-full overflow-x-hidden">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
