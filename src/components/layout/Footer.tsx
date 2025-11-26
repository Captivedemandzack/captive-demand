import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

const quickLinks = ["Home", "Services", "Case Studies", "About"];
const services = ["Product Strategy", "Brand Systems", "Experience Design", "Growth Funnels"];
const socials = [
    { href: "https://twitter.com", label: "Twitter", icon: Twitter },
    { href: "https://www.linkedin.com", label: "LinkedIn", icon: Linkedin },
    { href: "https://github.com", label: "GitHub", icon: Github },
];

export default function Footer() {
    return (
        <footer className="bg-brand-dark text-white">
            <div className="px-container-px py-section-py">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="space-y-4">
                        <p className="text-h3 font-bold text-white">PageVibe</p>
                        <p className="text-body text-white/70">
                            Crafting immersive demand gen experiences powered by Osmo-grade systems and PageVibe flair.
                        </p>
                    </div>

                    <div>
                        <p className="text-h3 font-semibold text-white">Quick Links</p>
                        <ul className="mt-4 space-y-2 text-body text-white/70">
                            {quickLinks.map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="transition hover:text-white">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-h3 font-semibold text-white">Services</p>
                        <ul className="mt-4 space-y-2 text-body text-white/70">
                            {services.map((service) => (
                                <li key={service}>{service}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <p className="text-h3 font-semibold text-white">Newsletter</p>
                        <p className="mt-4 text-body text-white/70">Monthly drops on experiments, playbooks, and tactile UI systems.</p>
                        <form className="mt-6 space-y-4">
                            <input
                                type="email"
                                required
                                placeholder="you@company.com"
                                className="w-full rounded-full bg-white/10 px-6 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                            />
                            <button
                                type="submit"
                                className="w-full rounded-full bg-brand-accent px-8 py-3 text-body font-medium text-white transition-transform hover:scale-105"
                            >
                                Join The Drop
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-body text-white/70">
                    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                        <p>© {new Date().getFullYear()} PageVibe. All rights reserved.</p>
                        <div className="flex items-center gap-4">
                            {socials.map(({ href, label, icon: Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="rounded-full border border-white/20 p-2 transition hover:border-white/60 hover:text-white"
                                >
                                    <Icon strokeWidth={1.5} className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

