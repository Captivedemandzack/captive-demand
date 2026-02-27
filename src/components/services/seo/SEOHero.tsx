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

export function SEOHero() {
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
            gsap.from('.seo-hero-text', {
                opacity: 0, x: -30, filter: 'blur(8px)',
                duration: 1.2, ease: 'power4.out', stagger: 0.08, delay: 0.3,
            });
            gsap.from('.seo-hero-image', {
                opacity: 0, x: 60, scale: 0.96,
                duration: 1.4, ease: 'power4.out', delay: 0.5,
            });
            gsap.from('.seo-badge', {
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
                        <div className="seo-hero-text mb-6">
                            <EyebrowHeading category="Service" label="SEO / AEO" dark />
                        </div>
                        <h1
                            className="seo-hero-text text-[clamp(2.5rem,5vw+1rem,4.5rem)] leading-[1] tracking-tighter mb-8 bg-gradient-to-br from-white via-white/90 to-white/30 bg-clip-text text-transparent"
                            style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 500 }}
                        >
                            Search clarity for the AI era
                        </h1>
                        <p className="seo-hero-text text-[15px] md:text-base text-white/40 font-mono mb-10 max-w-md leading-relaxed">
                            Most websites need support in two areas today. Traditional SEO that helps you show up on Google. AEO that helps you appear in AI Overviews and AI search results. We build both into your site so search engines and AI models can read your content clearly and present it accurately.
                        </p>
                        <div className="seo-hero-text">
                            <AnimatedCTAButton />
                        </div>
                    </div>

                    {/* RIGHT — SERP / Dashboard Composition */}
                    <div className="w-full lg:w-[62%] relative seo-hero-image pt-6 pb-16 px-6 sm:px-10 lg:p-0">
                        <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>

                            {/* MAIN FRAME */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-white/[0.10] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_24px_80px_rgba(0,0,0,0.6)]">
                                <Image
                                    src="/eosblank3.png"
                                    alt="SEO dashboard overview"
                                    fill
                                    className="object-cover"
                                    style={{ objectPosition: 'left top' }}
                                    priority
                                />
                            </div>

                            {/* GLASSMORPHIC BADGES */}

                            {/* Keyword Research — top right */}
                            <div className="seo-badge absolute -top-5 right-[3%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/45">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="M21 21l-4.35-4.35" />
                                        </svg>
                                        <span className="text-white/50 font-mono text-[10px] tracking-[0.1em] uppercase">Keywords</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Alt Text — left side */}
                            <div className="seo-badge absolute bottom-[28%] -left-3 sm:-left-8 lg:-left-10 z-40">
                                <GlassBadge className="min-w-[110px]">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-white/80 text-[28px] leading-none font-serif italic">
                                            Aa
                                        </span>
                                        <span className="text-white/30 font-mono text-[9px] tracking-[0.12em]">
                                            Alt Text
                                        </span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Schema Markup — bottom center-left */}
                            <div className="seo-badge absolute -bottom-5 left-[24%] z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2.5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/45">
                                            <polyline points="16 18 22 12 16 6" />
                                            <polyline points="8 6 2 12 8 18" />
                                        </svg>
                                        <span className="text-white/50 font-mono text-[10px] tracking-[0.1em] uppercase">Schema</span>
                                    </div>
                                </GlassBadge>
                            </div>

                            {/* Core Web Vitals — right side */}
                            <div className="seo-badge absolute top-[28%] -right-3 sm:-right-8 lg:-right-10 z-40">
                                <GlassBadge>
                                    <div className="flex items-center gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/45">
                                            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                                        </svg>
                                        <span className="text-white/50 font-mono text-[10px] tracking-[0.1em] uppercase">Vitals</span>
                                    </div>
                                </GlassBadge>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
