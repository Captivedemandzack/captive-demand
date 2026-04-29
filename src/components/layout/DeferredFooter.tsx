"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/layout/Footer";

export function DeferredFooter() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
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
    }, [mounted]);

    return mounted ? <Footer /> : null;
}
