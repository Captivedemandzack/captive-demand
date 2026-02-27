'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';

const terminalLines = [
    { prompt: '~', cmd: 'npm create captive-app@latest', delay: 0 },
    { output: '✓ Creating project structure...', delay: 800 },
    { output: '✓ Installing dependencies...', delay: 1400 },
    { output: '✓ Configuring TypeScript + Tailwind...', delay: 2000 },
    { output: '✓ Setting up API routes...', delay: 2600 },
    { prompt: '~', cmd: 'npm run dev', delay: 3400 },
    { output: '', delay: 3800 },
    { output: '  ▲ Ready in 1.2s', delay: 4200 },
    { output: '  ○ Local:   http://localhost:3000', delay: 4600 },
];

function AnimatedTerminal() {
    const [visibleLines, setVisibleLines] = useState(0);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        terminalLines.forEach((line, i) => {
            timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
        });
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] border border-white/10">
            <div className="h-10 bg-white/5 backdrop-blur-xl flex items-center px-4 gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-[#ff5501]/60" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <span className="ml-4 text-[10px] font-mono text-white/30 tracking-wider uppercase">terminal</span>
            </div>
            <div className="bg-[#0a0908]/80 backdrop-blur-xl p-6 font-mono text-sm leading-relaxed min-h-[280px]">
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className="flex gap-2">
                        {line.prompt ? (
                            <>
                                <span className="text-[#ff5501] select-none">{line.prompt} $</span>
                                <span className="text-white/90">{line.cmd}</span>
                            </>
                        ) : (
                            <span className="text-white/50">{line.output}</span>
                        )}
                    </div>
                ))}
                {visibleLines < terminalLines.length && (
                    <span className="inline-block w-2 h-4 bg-[#ff5501] animate-pulse" />
                )}
            </div>
        </div>
    );
}

export function SoftwareHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.sw-hero-terminal', {
                opacity: 0,
                x: -60,
                duration: 1.2,
                ease: 'power4.out',
                delay: 0.1
            });

            gsap.from('.sw-hero-text', {
                opacity: 0,
                x: 50,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.08,
                delay: 0.3
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full bg-[#1A1512] pt-32 md:pt-48 pb-20 md:pb-32 px-4 overflow-hidden">
            {/* Noise texture overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
            }} />

            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff5501]/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* LEFT: Animated Terminal */}
                    <div className="sw-hero-terminal w-full lg:w-1/2">
                        <AnimatedTerminal />
                    </div>

                    {/* RIGHT: Text Content */}
                    <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                        <div className="sw-hero-text mb-6">
                            <EyebrowHeading category="Service:" label="Software" dark />
                        </div>

                        <h1
                            className="sw-hero-text text-5xl md:text-7xl lg:text-8xl font-[600] leading-[0.9] tracking-tight text-white mb-8"
                            style={{ fontFamily: 'Nohemi, sans-serif' }}
                        >
                            CUSTOM<br />
                            SOFTWARE<br />
                            THAT<br />
                            <span className="text-white/40">SCALES.</span>
                        </h1>

                        <p className="sw-hero-text text-lg md:text-xl text-white/50 font-mono mb-10 max-w-md leading-relaxed">
                            From MVPs to enterprise platforms. We architect, build, and ship production-grade software.
                        </p>

                        <div className="sw-hero-text">
                            <AnimatedCTAButton />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
