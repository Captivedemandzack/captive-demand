'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { AnimatedCTAButton } from '@/components/sections/Hero';
import { EyebrowHeading } from '@/components/ui/eyebrow-heading';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

const VERT = `attribute vec2 position;void main(){gl_Position=vec4(position,0,1);}`;

const FRAG = `precision highp float;
uniform vec2 u_res;
uniform float u_t;
vec3 m3(vec3 x){return x-floor(x/289.)*289.;}
vec2 m2(vec2 x){return x-floor(x/289.)*289.;}
vec3 pm(vec3 x){return m3(((x*34.)+1.)*x);}
float sn(vec2 v){
  const vec4 C=vec4(.2113,.3660,-.5774,.0244);
  vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1,0):vec2(0,1);
  vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=m2(i);
  vec3 p=pm(pm(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));
  vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m;m=m*m;
  vec3 x_=2.*fract(p*C.www)-1.,h=abs(x_)-.5,ox=floor(x_+.5),a0=x_-ox;
  m*=1.7928-0.8537*(a0*a0+h*h);
  vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;float t=u_t*.08;
  vec3 c=vec3(.047,.039,.031);
  vec3 o1=vec3(1.,.33,0.),o2=vec3(.85,.20,0.),am=vec3(1.,.45,.08);
  vec2 w1=uv+vec2(sn(uv*1.5+t*.3)*.12,sn(uv*1.5+t*.2+100.)*.12);
  vec2 w2=uv+vec2(sn(uv*2.-t*.25)*.08,sn(uv*2.-t*.15+200.)*.08);
  vec2 p1=vec2(.3+sin(t*.5)*.1,.35+cos(t*.3)*.1);
  vec2 p2=vec2(.65+cos(t*.4)*.08,.25+sin(t*.55)*.08);
  vec2 p3=vec2(.5+sin(t*.35)*.1,.7+cos(t*.45)*.08);
  vec2 p4=vec2(.8+cos(t*.25)*.06,.55+sin(t*.4)*.1);
  vec2 p5=vec2(.15+sin(t*.6)*.08,.2+cos(t*.35)*.08);
  c+=o1*smoothstep(.4,0.,length((w1-p1)*vec2(1.3,.7)))*.20;
  c+=o2*smoothstep(.35,0.,length((w2-p2)*vec2(.8,1.4)))*.16;
  c+=am*smoothstep(.3,0.,length((w1-p3)*vec2(1.1,.6)))*.12;
  c+=o1*smoothstep(.28,0.,length((w2-p4)*vec2(.7,1.2)))*.10;
  c+=o2*smoothstep(.35,0.,length((w1-p5)*vec2(1.,.9)))*.14;
  float gr=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
  c+=(gr-.5)*.015;
  gl_FragColor=vec4(c,1);
}`;

function GlassBadge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-white/[0.18] text-[9px] font-mono select-none leading-none">+</span>
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-white/[0.18] text-[9px] font-mono select-none leading-none">+</span>
            <span className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 text-white/[0.18] text-[9px] font-mono select-none leading-none">+</span>
            <span className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 text-white/[0.18] text-[9px] font-mono select-none leading-none">+</span>
            <div className="backdrop-blur-md bg-white/[0.03] border border-white/[0.07] rounded px-3.5 py-2.5">
                {children}
            </div>
        </div>
    );
}

function SelectionHandle({ className }: { className: string }) {
    return <div className={`absolute w-[7px] h-[7px] bg-[#4a90d9] ${className}`} />;
}

export function WebsiteHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
        if (!gl) {
            canvas.style.background = '#0c0a08';
            return;
        }

        function compile(t: number, src: string) {
            const s = gl!.createShader(t);
            if (!s) return null;
            gl!.shaderSource(s, src);
            gl!.compileShader(s);
            if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
                gl!.deleteShader(s);
                return null;
            }
            return s;
        }

        const vs = compile(gl.VERTEX_SHADER, VERT);
        const fs = compile(gl.FRAGMENT_SHADER, FRAG);
        if (!vs || !fs) { canvas.style.background = '#0c0a08'; return; }

        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            canvas.style.background = '#0c0a08';
            return;
        }

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

        const posLoc = gl.getAttribLocation(prog, 'position');
        const resLoc = gl.getUniformLocation(prog, 'u_res');
        const timeLoc = gl.getUniformLocation(prog, 'u_t');

        let w = 0, h = 0;
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const r = canvas.getBoundingClientRect();
            w = r.width; h = r.height;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            gl!.viewport(0, 0, canvas.width, canvas.height);
        };

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);
        resize();

        let animId: number;
        const t0 = performance.now();
        const render = () => {
            if (w === 0 || h === 0) { animId = requestAnimationFrame(render); return; }
            const t = (performance.now() - t0) / 1000;
            gl!.useProgram(prog);
            gl!.enableVertexAttribArray(posLoc);
            gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
            gl!.vertexAttribPointer(posLoc, 2, gl!.FLOAT, false, 0, 0);
            gl!.uniform2f(resLoc, canvas.width, canvas.height);
            gl!.uniform1f(timeLoc, t);
            gl!.drawArrays(gl!.TRIANGLES, 0, 6);
            animId = requestAnimationFrame(render);
        };
        render();

        return () => { cancelAnimationFrame(animId); ro.disconnect(); };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.ws-hero-text', {
                opacity: 0, x: -30, filter: 'blur(8px)',
                duration: 1.2, ease: 'power4.out', stagger: 0.08, delay: 0.3,
            });
            gsap.from('.ws-hero-image', {
                opacity: 0, x: 60, scale: 0.96,
                duration: 1.4, ease: 'power4.out', delay: 0.5,
            });
            gsap.from('.ws-badge', {
                opacity: 0, scale: 0.8, y: 20,
                duration: 0.9, ease: 'power4.out', stagger: 0.08, delay: 1.0,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            <NoiseOverlay opacity={0.03} className="mix-blend-soft-light" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-[15px] sm:px-container-px pt-36 md:pt-48 pb-24 md:pb-36">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* LEFT — Text */}
                    <div className="w-full lg:w-[38%] flex flex-col items-start text-left">
                        <div className="ws-hero-text mb-6">
                            <EyebrowHeading category="Service" label="Website Design/Development" dark />
                        </div>
                        <h1
                            className="ws-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 bg-gradient-to-br from-white via-white/90 to-white/30 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                        >
                            Design that prints money
                        </h1>
                        <p className="ws-hero-text text-[15px] md:text-base text-white/40 font-mono mb-10 max-w-md leading-relaxed">
                        Your website should produce ROI. We are conversion-obsessed and take your business's performance personally. Every pixel is optimized to do one thing: generate cash flow. If it doesn't align with your goals, it doesn't make it into production.
                        </p>
                        <div className="ws-hero-text">
                            <AnimatedCTAButton />
                        </div>
                    </div>

                    {/* RIGHT — Editor Composition */}
                    <div className="w-full lg:w-[62%] relative ws-hero-image pt-6 pb-16 px-6 sm:px-10 lg:p-0">
                        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>

                            {/* EDITOR FRAME */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-white/[0.10] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.6)]">

                                {/* Rossi website screenshot */}
                                <Image
                                    src="/eosblank3.png"
                                    alt="Website in development"
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: 'left top' }}
                                    priority
                                />

                                {/* ADD SECTION banner */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
                                    <div className="bg-[#4a90d9] text-white text-[7px] sm:text-[8px] font-mono tracking-[0.15em] uppercase px-4 py-[3px] rounded-b-sm shadow-sm">
                                        ADD SECTION
                                    </div>
                                </div>

                                {/* TEXT selection box — over the heading */}
                                <div className="absolute top-[26%] left-[2%] w-[47%] h-[17%] border-[1.5px] border-[#4a90d9]/50 z-20 pointer-events-none">
                                    <div className="absolute -top-[14px] left-0 bg-[#4a90d9] text-white text-[7px] font-mono tracking-[0.12em] px-2 py-[2px] rounded-t-sm uppercase">
                                        TEXT
                                    </div>
                                    <SelectionHandle className="-top-[3px] -left-[3px]" />
                                    <SelectionHandle className="-top-[3px] -right-[3px]" />
                                    <SelectionHandle className="-bottom-[3px] -left-[3px]" />
                                    <SelectionHandle className="-bottom-[3px] -right-[3px]" />
                                    <SelectionHandle className="-top-[3px] left-1/2 -translate-x-1/2" />
                                    <SelectionHandle className="-bottom-[3px] left-1/2 -translate-x-1/2" />
                                    <SelectionHandle className="top-1/2 -translate-y-1/2 -left-[3px]" />
                                    <SelectionHandle className="top-1/2 -translate-y-1/2 -right-[3px]" />
                                </div>

                                {/* ADD BLOCK — below the CTA button */}
                                <div className="absolute top-[85%] left-[4%] z-20">
                                    <div className="bg-transparent rounded border border-dotted border-[#4a90d9] px-1.5 sm:px-2 py-1.5 flex items-center gap-1 hover:bg-[#4a90d9]/10 transition-colors">
                                        <span className="text-[#4a90d9] text-[10px] leading-none font-medium">+</span>
                                        <span className="text-[#4a90d9] text-[7px] sm:text-[8px] font-mono tracking-wider uppercase">ADD BLOCK</span>
                                    </div>
                                </div>
                            </div>

                            {/* GLASSMORPHIC BADGES */}

                            {/* Custom Icons — top right */}
                            <div className="ws-badge absolute -top-5 right-[3%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/45">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                        <span className="text-white/50 font-mono text-[10px] tracking-[0.1em] uppercase">Custom Icons</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Site Typography — left side */}
                            <div className="ws-badge absolute bottom-[28%] -left-3 sm:-left-8 lg:-left-10 z-40">
                                <GlassBadge className="min-w-[110px]">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-white/80 text-[28px] leading-none font-serif italic">
                                            Aa
                                        </span>
                                        <span className="text-white/30 font-mono text-[9px] tracking-[0.12em]">
                                            Site Typography
                                        </span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Color Palette — hanging off bottom edge */}
                            <div className="ws-badge absolute -bottom-5 left-[24%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-5 h-5 rounded-full bg-[#0d1617] ring-1 ring-white/[0.08]" />
                                        <div className="w-5 h-5 rounded-full bg-[#2d3e50] ring-1 ring-white/[0.08]" />
                                        <div className="w-5 h-5 rounded-full bg-[#fbf5f3] ring-1 ring-white/[0.08]" />
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Responsive — right side, above finished site */}
                            <div className="ws-badge absolute top-[28%] -right-3 sm:-right-8 lg:-right-10 z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/45">
                                            <rect x="2" y="3" width="20" height="14" rx="2" />
                                            <line x1="8" y1="21" x2="16" y2="21" />
                                            <line x1="12" y1="17" x2="12" y2="21" />
                                        </svg>
                                        <span className="text-white/50 font-mono text-[10px] tracking-[0.1em] uppercase">Responsive</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* FINISHED WEBSITE — bottom right */}
                            <div className="ws-badge absolute -bottom-10 sm:-bottom-14 right-0 sm:-right-3 lg:-right-6 w-[36%] sm:w-[44%] z-30 rounded-lg overflow-hidden border-2 border-white/[0.10] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_60px_rgba(0,0,0,0.5)]">
                                <div className="h-6 bg-[#e8e5e1] flex items-center px-2.5 gap-2 border-b border-black/[0.05]">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                                        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                                        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                                    </div>
                                    <div className="flex-1 flex items-center h-3.5 bg-white/70 rounded px-2 mx-1">
                                        <span className="text-[6px] text-black/30 font-mono truncate">symmetri.com</span>
                                    </div>
                                </div>
                                <Image
                                    src="/eos6152.png"
                                    alt="Finished website"
                                    width={500}
                                    height={350}
                                    className="object-cover object-top w-full h-auto"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
