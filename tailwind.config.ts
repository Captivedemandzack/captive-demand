import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // 1. FONTS (Kept from your original setup)
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },

            // 2. OSMO STRUCTURE (Fluid Typography)
            fontSize: {
                "h1": ["clamp(3rem, 5vw + 1rem, 6rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
                "h2": ["clamp(2rem, 4vw + 1rem, 3rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
                "h3": ["clamp(1.5rem, 2vw + 1rem, 2rem)", { lineHeight: "1.3", fontWeight: "500" }],
                "body": ["clamp(1rem, 0.5vw + 0.875rem, 1.125rem)", { lineHeight: "1.6" }],
            },

            // 3. OSMO SPACING (Fluid 8pt Grid)
            spacing: {
                "container-px": "clamp(1rem, 5vw, 3rem)",
                "section-py": "clamp(4rem, 8vw, 8rem)",
                "card-gap": "clamp(1rem, 3vw, 2rem)",
            },

            // 4. PAGEVIBE BRAND COLORS (Your specific palette)
            colors: {
                brand: {
                    bg: "#E8DDD3",      // Your Beige Background
                    dark: "#1a1512",    // Your Dark Text/Foreground
                    accent: "#8b5cf6",  // Your Purple Accent
                    secondary: "#2d2621", // Dark Brown/Secondary
                },
                // Utility mappings for ease of use
                background: "#E8DDD3",
                foreground: "#1a1512",
            }
        },
    },
    plugins: [],
};
export default config;
