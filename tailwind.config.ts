import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#E8DDD3",
                foreground: "#1a1512",
                primary: {
                    DEFAULT: "#1a1512",
                    foreground: "#E8DDD3",
                },
                secondary: {
                    DEFAULT: "#2d2621",
                    foreground: "#E8DDD3",
                },
                accent: {
                    DEFAULT: "#8b5cf6",
                    foreground: "#ffffff",
                },
                card: {
                    DEFAULT: "#1a1512",
                    foreground: "#E8DDD3",
                },
            },
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
                mono: ["var(--font-mono)", "monospace"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
