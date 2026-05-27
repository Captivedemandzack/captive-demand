"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";
import { isShorePartnershipPath } from "@/lib/shore-partnership";

export function DeferredFooter() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isShorePartnershipPath(pathname)) {
            return;
        }
        if (mounted) return;

        const mountFooter = () => setMounted(true);
        const onScroll = () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                mountFooter();
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [pathname, mounted]);

    if (isShorePartnershipPath(pathname)) {
        return null;
    }

    return mounted ? <Footer /> : null;
}
