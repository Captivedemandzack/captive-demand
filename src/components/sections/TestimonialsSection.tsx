"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Types
type Testimonial = {
  id: number;
  text: string;
  author: string;
  role: string;
  company: string;
  image: string;
};

type PartnerLogo = {
  id: number;
  name: string;
  src: string;
};

// Data
const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Spencer is knowledgeable, patient, and open to listen! He's willing to try anything to help move the needle, and he's easy to talk to... I feel like he really cares about our business. In addition, our traffic has grown from 1,200 users per month to 11,000 users per month and revenue has increased by 34% YOY.",
    author: "Tricia Restifo",
    role: "VP Finance",
    company: "Farmulated",
    image: "/tricia.webp"
  },
  {
    id: 2,
    text: "I've been working in SEO for about a decade now. I've always built my teams in-house because agencies always tend to be too expensive or terrible quality. Captive had very fair prices and followed a process nearly identical to the one I was used to running with my in-house teams, so I knew the quality would be excellent. They're the only SEO agency I've collaborated with that knows what they're doing and doesn't charge an absurd price!",
    author: "Jordan Schneider",
    role: "Head of Marketing",
    company: "Boombox",
    image: "/Jordan.jpeg"
  },
  {
    id: 3,
    text: "Our business went from only referral-based clients to having an entire authoritative online presence that allowed us to grow by over 1,000% in our first true year of business. It opened doors to partnerships that we did not believe were possible as well as avenues to get listed on other popular blogs, websites, and apps in our same target market.",
    author: "Matthew Ford",
    role: "Founder",
    company: "BachBar",
    image: "/matthew.webp"
  },
  {
    id: 4,
    text: "They are always on time and they're always willing to listen to my non-tech vision and translate the vision into core pieces of my business. They are responsive, have a high quality of work, and always listen to my goals.",
    author: "Bonnie Paik",
    role: "Owner",
    company: "Finally Home Services",
    image: "/bonnie.webp"
  },
  {
    id: 5,
    text: "Captive Demand is different than any other agency we have worked with. They take a genuine interest in your success and back up their promises with results. Our website is everything we wanted and more, and the marketing efforts are delivering us more business than we could have imagined.",
    author: "Ben Elizer",
    role: "CEO",
    company: "Velocity International",
    image: "/ben.webp"
  },
  {
    id: 6,
    text: "Spencer is the best. He has helped us with our website needs and is always responsive. He is also great to collaborate with when it comes to marketing strategies. Highly recommend.",
    author: "Michael Scott",
    role: "CEO",
    company: "Endura Commerce",
    image: "/michael.jpg"
  },
  {
    id: 7,
    text: "I cannot say enough amazing things about this team and the work they deliver. I worked with Zachary and Spencer to build my dream Wordpress website plus a custom-built, member-only dashboard that exceeded my expectations and brought my vision to life. They're easy to communicate with, pricing is fair, they have great ideas and solutions, and delivered everything on time. I'm so thankful for a web development team that was just as excited about the project as I was and contributed to the creative process. Highly recommend!",
    author: "Amy Schols",
    role: "CEO",
    company: "Modern Mentor",
    image: "/amy.jpg"
  }
];

const logos: PartnerLogo[] = [
  { id: 1, name: "Farmulated", src: "/logos/farmulated.png" },
  { id: 2, name: "Boombox", src: "/logos/boombox.svg" },
  { id: 3, name: "BachBar", src: "/logos/bachbar.png" },
  { id: 4, name: "Finally Home Services", src: "/logos/finallyhomeservices.png" },
  { id: 5, name: "Velocity", src: "/logos/velocity.png" },
  { id: 6, name: "Endura Commerce", src: "/logos/enduracommerce.svg" },
  { id: 7, name: "Modern Mentor", src: "/logos/modernmentor.png" },
  { id: 8, name: "Arctic Elevation", src: "/logos/arcticelevation.png" },
  { id: 9, name: "Arete", src: "/logos/arete.png" },
  { id: 10, name: "Dubsy", src: "/logos/dubsy.svg" },
  { id: 11, name: "EOS Wellness", src: "/logos/eoswellness.png" },
  { id: 12, name: "Encappture", src: "/logos/encappture.png" },
  { id: 13, name: "The Skin Real", src: "/logos/theskinreal.png" },
  { id: 14, name: "Voyage and Vibes", src: "/logos/voyageandvibes.png" },
  { id: 15, name: "First Future", src: "/logos/firstfuture.png" },
  { id: 16, name: "Mountain Sledge", src: "/logos/mountainsledge.png" },
];

// Helper Components
const GradientQuoteIcon = () => (
  <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
    <path d="M19.7711 12.3665C20.0495 11.3681 18.976 10.6575 17.9395 10.6575C16.5573 10.6575 15.3611 10.1461 14.351 9.12342C13.2878 8.10074 12.7561 6.86277 12.7561 5.40948C12.7561 3.90236 13.2878 2.61054 14.351 1.53403C15.3611 0.511342 16.6104 -6.46018e-07 18.099 -5.15885e-07C19.9065 -3.57866e-07 21.3419 0.645908 22.4051 1.93772C23.4684 3.22954 24 4.89814 24 6.94351C24 10.496 23.0431 13.4026 21.1292 15.6632C19.3099 17.8634 16.818 19.5043 13.6535 20.5857C13.3829 20.6782 13.0928 20.5194 13.0184 20.2432C12.9581 20.0193 13.0593 19.7839 13.2603 19.6683C15.079 18.6223 16.6387 17.3143 17.9395 15.744C18.8192 14.7163 19.4297 13.5904 19.7711 12.3665ZM7.01491 12.6167C7.29338 11.6183 6.21987 10.9077 5.18331 10.9077C3.80108 10.9077 2.60493 10.3963 1.59484 9.37366C0.531589 8.35098 1.21404e-06 7.11299 1.34109e-06 5.6597C1.47285e-06 4.15258 0.531589 2.86076 1.59484 1.78425C2.60493 0.761562 3.85425 0.250219 5.3428 0.25022C7.15032 0.25022 8.58571 0.896128 9.64896 2.18794C10.7122 3.47976 11.2438 5.14836 11.2438 7.19373C11.2438 10.7462 10.2869 13.6528 8.37306 15.9135C6.55373 18.1137 4.06185 19.7545 0.897371 20.836C0.626768 20.9285 0.336657 20.7696 0.262276 20.4935C0.201963 20.2696 0.30315 20.0341 0.504164 19.9185C2.32284 18.8726 3.88253 17.5645 5.18331 15.9942C6.06302 14.9665 6.67355 13.8407 7.01491 12.6167Z" fill="url(#paint0_linear_1116_1242)" />
    <defs>
      <linearGradient id="paint0_linear_1116_1242" x1="-4.65022" y1="13.2297" x2="27.2841" y2="14.3552" gradientUnits="userSpaceOnUse">
        <stop offset="0.126938" stopColor="#FF3407" />
        <stop offset="0.227251" stopColor="#FC964C" />
        <stop offset="0.304963" stopColor="#FC964C" />
        <stop offset="0.490937" stopColor="#F62F03" />
        <stop offset="1" stopColor="#FD7C34" />
      </linearGradient>
    </defs>
  </svg>
);

const CardBorder = () => (
  <>
    {/* Left/Top/Right Borders with opacity gradients */}
    <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 overflow-hidden">
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.16) 100%)'
      }} />
      {/* Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.16) 100%)'
      }} />
    </div>
  </>
);

// @component: TestimonialsSection
export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const autoplayDuration = 8000; // 8 seconds per slide for longer quotes

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length);
      setProgressKey(prev => prev + 1);
    }, autoplayDuration);
    return () => clearInterval(timer);
  }, []);

  const handleManualChange = (index: number) => {
    setActiveIndex(index);
    setProgressKey(prev => prev + 1); // Reset progress bar
  };

  return (
    <section className="w-full min-h-screen bg-[#FAFAFA] text-black flex flex-col items-center justify-center py-20 md:py-32 px-4 overflow-hidden font-sans relative">
      
      {/* Background Logo Carousel - Behind everything */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center z-0">
        {/* Gradient Masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        
        <div className="flex items-center justify-center w-full">
          <motion.div 
            className="flex gap-16 items-center" 
            animate={{ x: [0, -1500] }} 
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear"
              }
            }}
          >
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 opacity-30" style={{ filter: 'grayscale(100%) brightness(0.4)' }}>
                <Image 
                  src={logo.src} 
                  alt={logo.name} 
                  width={120}
                  height={48}
                  className="h-10 md:h-12 w-auto object-contain" 
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl w-full flex flex-col items-center z-10 relative">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-wide" style={{ fontFamily: 'Nohemi, sans-serif', fontWeight: 300, letterSpacing: '0.05em' }}>
            <span className="text-[#d3d4d9]">Trusted to drive revenue</span>
            <br />
            <span className="text-[#1a1512]">by the best in the industry</span>
          </h2>
        </div>

        {/* Testimonial Card Stack - Centered */}
        <div className="relative w-full max-w-[540px] h-[480px] mx-auto flex flex-col justify-center">
          
          {/* Background Decoration Card - Orange gradient on the left */}
          <div 
            className="absolute top-0 left-0 w-full h-[400px] rounded-2xl z-0 transform -translate-x-12 translate-y-1 -rotate-3" 
            style={{
              background: 'linear-gradient(272deg, #ff3407 -16.91%, #ff3407 -.51%, #fc964c 12.46%, #fc964c 22.5%, #f62f03 46.54%, #f62f03 71.84%, #fd7c34 112.33%)',
              boxShadow: '0 25px 50px -12px rgba(209, 122, 74, 0.3)'
            }} 
          />
          
          {/* Background Decoration Card - Grey on the right */}
          <div 
            className="absolute top-0 left-0 w-full h-[400px] bg-[#f6f5f6] rounded-2xl border border-black/5 z-0 transform translate-x-12 translate-y-2 rotate-3" 
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
            }} 
          />

          {/* Active Card Container */}
          <div className="relative w-full h-[400px] z-10">
            <div className="relative w-full h-full bg-[#f6f5f6] rounded-2xl border border-black/5 p-6 md:p-8 flex flex-col shadow-2xl overflow-hidden group">
              {/* Subtle Gradient Glow inside card */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-orange-500/5 to-transparent opacity-50 pointer-events-none" />
              
              <CardBorder />
              <GradientQuoteIcon />

              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeIndex} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    transition={{ duration: 0.4, ease: "easeOut" }} 
                    className="h-full flex flex-col"
                  >
                    {/* Quote Text - font-mono style */}
                    <p className="font-mono text-xs md:text-sm text-[#1a1512]/70 leading-relaxed uppercase tracking-wide mb-4 flex-1 overflow-y-auto">
                      &ldquo;{testimonials[activeIndex].text}&rdquo;
                    </p>
                    
                    {/* Author Info with Image */}
                    <div className="flex items-center gap-4 mt-auto pt-4 border-t border-black/5">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-md">
                        <Image
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a1512] text-sm">
                          {testimonials[activeIndex].author}
                        </p>
                        <p className="text-xs text-[#1a1512]/50">
                          {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Bar & Pagination - Inside Card */}
              <div className="relative w-full mt-4 pt-4">
                {/* Progress Line */}
                <div className="relative w-full h-[2px] bg-black/10 rounded-full overflow-hidden mb-4">
                  <motion.div 
                    key={progressKey} 
                    initial={{ width: "0%" }} 
                    animate={{ width: "100%" }} 
                    transition={{
                      duration: autoplayDuration / 1000,
                      ease: "linear"
                    }} 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF3407] via-[#FC964C] to-[#FD7C34]" 
                  />
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => handleManualChange(idx)} 
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        idx === activeIndex 
                          ? 'bg-black/30' 
                          : 'bg-black/10 hover:bg-black/20'
                      }`} 
                      aria-label={`Go to slide ${idx + 1}`} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Background radial gradient for subtle ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-radial from-black/5 to-transparent opacity-20" />
      </div>
    </section>
  );
}
