import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

// Types
type Testimonial = {
  id: number;
  text: string;
  author: string;
  role?: string;
};
type PartnerLogo = {
  id: number;
  name: string;
  src: string;
};

// Data
const testimonials: Testimonial[] = [{
  id: 1,
  text: "Mount Media has proven time and time again that they are the industry leaders in high quality iGaming PPC traffic. Their account managers are available around the clock and always willing to assist our every request.",
  author: "Mio Media",
  role: "Partner"
}, {
  id: 2,
  text: "If you need reliable traffic solutions, we highly suggest to start a partnership with Mount Media. Their commitment to quality has significantly elevated our online presence and contributed to the success of our products. Amazing staff and great attention to detail!",
  author: "Growe partners",
  role: "Partner"
}];
const logos: PartnerLogo[] = [{
  id: 1,
  name: "7Stars Partners",
  src: "https://www.mount-media.com/wp-content/uploads/7stars-partners-logo.svg"
}, {
  id: 2,
  name: "888",
  src: "https://www.mount-media.com/wp-content/uploads/888-logo.svg"
}, {
  id: 3,
  name: "Magic Jackpot",
  src: "https://www.mount-media.com/wp-content/uploads/Magic-jackpot-logo.svg"
}, {
  id: 4,
  name: "Mate Affiliates",
  src: "https://www.mount-media.com/wp-content/uploads/mate-affiliates.svg"
}, {
  id: 5,
  name: "N1 Casino",
  src: "https://www.mount-media.com/wp-content/uploads/N1-Casino.svg"
}, {
  id: 6,
  name: "Pari Match",
  src: "https://www.mount-media.com/wp-content/uploads/Pari-Match-logo.svg"
}, {
  id: 7,
  name: "KTO",
  src: "https://www.mount-media.com/wp-content/uploads/KTO-logo.svg"
}, {
  id: 8,
  name: "PrizePicks",
  src: "https://www.mount-media.com/wp-content/uploads/Prizepicks.svg"
}, {
  id: 9,
  name: "Superbet",
  src: "https://www.mount-media.com/wp-content/uploads/Superbet.svg"
}];

// Helper Components
const GradientQuoteIcon = () => <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
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
  </svg>;
const CardBorder = () => <>
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
  </>;

// @component: TestimonialsCarousel
export const TestimonialsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const autoplayDuration = 5000; // 5 seconds per slide

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

  // @return
  return <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden font-sans relative">
      
      {/* Background Logo Carousel - Behind everything */}
      <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center z-0">
        {/* Gradient Masks for fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        
        <div className="flex items-center justify-center w-full">
          <motion.div className="flex gap-16 items-center" animate={{
          x: [0, -1000]
        }} transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
          }
        }}>
            {[...logos, ...logos, ...logos].map((logo, index) => <div key={`${logo.id}-${index}`} className="flex-shrink-0 grayscale opacity-20">
                <img src={logo.src} alt={logo.name} className="h-10 md:h-12 w-auto object-contain" onError={e => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerText = logo.name;
            }} />
              </div>)}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl w-full flex flex-col items-center z-10 relative">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl lg:text-[64px] font-light leading-tight tracking-tight">
            <span className="font-serif italic text-gray-200">Trusted by the best</span>
            <br />
            <span className="font-sans font-light text-white">in your industry</span>
          </h2>
        </div>

        {/* Testimonial Card Stack - Centered */}
        <div className="relative w-full max-w-[500px] h-[400px] mx-auto flex flex-col justify-center">
          
          {/* Background Decoration Card - Orange on the left */}
          <div className="absolute top-0 left-0 w-full h-[327px] rounded-2xl z-0 transform -translate-x-12 translate-y-1 -rotate-3" style={{
          background: 'linear-gradient(272deg, #ff3407 -16.91%, #ff3407 -.51%, #fc964c 12.46%, #fc964c 22.5%, #f62f03 46.54%, #f62f03 71.84%, #fd7c34 112.33%)',
          boxShadow: '0 25px 50px -12px rgba(209, 122, 74, 0.3)'
        }} />
          
          {/* Background Decoration Card - Dark on the right */}
          <div className="absolute top-0 left-0 w-full h-[327px] bg-[#0a0a0a] rounded-2xl border border-white/10 z-0 transform translate-x-12 translate-y-2 rotate-3" style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }} />

          {/* Active Card Container */}
          <div className="relative w-full h-[327px] z-10">
            <div className="relative w-full h-full bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 pb-12 flex flex-col shadow-2xl overflow-hidden group">
              {/* Subtle Gradient Glow inside card */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-orange-500/5 to-transparent opacity-50 pointer-events-none" />
              
              <CardBorder />
              <GradientQuoteIcon />

              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div key={activeIndex} initial={{
                  opacity: 0,
                  y: 10
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -10
                }} transition={{
                  duration: 0.4,
                  ease: "easeOut"
                }} className="h-full flex flex-col justify-between">
                    <p className="text-lg md:text-xl font-light text-gray-100 leading-relaxed mb-6">
                      "{testimonials[activeIndex].text}"
                    </p>
                    
                    <div className="mt-auto mb-2">
                      <p className="text-base font-medium text-white/50">
                        {testimonials[activeIndex].author}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Bar & Pagination - Inside Card */}
              <div className="relative w-full mt-6 pt-4">
                {/* Progress Line */}
                <div className="relative w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
                  <motion.div key={progressKey} initial={{
                  width: "0%"
                }} animate={{
                  width: "100%"
                }} transition={{
                  duration: autoplayDuration / 1000,
                  ease: "linear"
                }} className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF3407] via-[#FC964C] to-[#FD7C34]" />
                </div>

                {/* Dots */}
                <div className="flex justify-center gap-2">
                  {testimonials.map((_, idx) => <button key={idx} onClick={() => handleManualChange(idx)} className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${idx === activeIndex ? 'bg-white/20 border border-transparent' : 'bg-transparent border border-white/20 hover:bg-white/10'}`} aria-label={`Go to slide ${idx + 1}`} />)}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Background radial gradient for subtle ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] pointer-events-none z-0">
         <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-20" />
      </div>
    </div>;
};