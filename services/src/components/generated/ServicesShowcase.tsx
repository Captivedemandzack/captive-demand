import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
};
const services: Service[] = [{
  id: '01',
  number: '01',
  title: 'Web Design & Development',
  description: 'Logos, colors, type, your brand, fully alive. We build high-performance websites that look great and convert even better.',
  tags: ['Responsive Design', 'Interaction Design', 'CMS Integration', 'SEO Optimization'],
  imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2069&auto=format&fit=crop'
}, {
  id: '02',
  number: '02',
  title: 'Branding',
  description: 'Crafting visual identities that feel clear, timeless, and true to your brand. We help you find your voice in a crowded market.',
  tags: ['Logo Design', 'Color System', 'Typography', 'Brand Direction'],
  imageUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop'
}, {
  id: '03',
  number: '03',
  title: 'Social Media',
  description: 'Branded templates and content systems to help you stay consistent and scroll-worthy across all channels.',
  tags: ['Instagram Design', 'Story Kits', 'Content Templates', 'Visual Consistency'],
  imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop'
}, {
  id: '04',
  number: '04',
  title: 'Motion Design',
  description: 'Thoughtful animations that add rhythm, clarity, and life to your interface. We make things move with purpose.',
  tags: ['Micro-interactions', 'Scroll Effects', 'Hover States', 'Framer Motion'],
  imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
}];

// @component: ServicesShowcase
export const ServicesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  // @return
  return <section className="w-full min-h-screen bg-[#0a0a0a] text-[#cacaca] px-4 py-20 md:py-32 font-sans overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header Section */}
        <div className="relative flex flex-col items-center justify-center text-center">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="relative z-10">
             <h2 className="text-[12vw] md:text-[9vw] leading-[0.8] font-bold tracking-tighter text-[#cacaca] uppercase select-none">
              <span className="inline-block">How</span>{' '}
              <span className="inline-block">We</span>{' '}
              <span className="inline-block">Can</span>{' '}
              <span className="inline-block">Help</span>
            </h2>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3,
          duration: 0.6
        }} className="mt-8 md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2">
            <span className="text-sm font-medium tracking-wide text-[#8f8f8f] border border-[#333] px-4 py-1.5 rounded-full uppercase">
              (Services)
            </span>
          </motion.div>
        </div>

        {/* Services List */}
        <div className="w-full flex flex-col">
          {/* Top Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent mb-4" />

          {services.map((service, index) => {
          const isActive = activeIndex === index;
          return <div key={service.id} className="group flex flex-col">
                {/* Accordion Item */}
                <div className={`relative flex flex-col transition-colors duration-500 cursor-pointer ${isActive ? 'py-12' : 'py-8 hover:bg-white/5'}`} onClick={() => setActiveIndex(isActive ? null : index)}>
                  {/* Background Glow for Active State */}
                  {isActive && <motion.div layoutId="activeGlow" className="absolute inset-0 bg-gradient-to-b from-[#111] to-transparent -z-10" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} exit={{
                opacity: 0
              }} />}

                  <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start px-4 md:px-8">
                    
                    {/* Number */}
                    <div className="col-span-12 md:col-span-2 flex items-baseline gap-1">
                      <span className={`text-3xl md:text-4xl font-semibold transition-colors duration-300 ${isActive ? 'text-[#cacaca]' : 'text-[#555] group-hover:text-[#888]'}`}>
                        {service.number}
                      </span>
                      <span className={`text-3xl md:text-4xl font-semibold transition-colors duration-300 ${isActive ? 'text-[#ff4925]' : 'text-[#555] group-hover:text-[#888]'}`}>
                        .
                      </span>
                    </div>

                    {/* Content Container */}
                    <div className="col-span-12 md:col-span-10 flex flex-col md:flex-row gap-8 md:gap-16 w-full">
                      
                      {/* Title & Arrow */}
                      <div className="flex-1 flex items-center justify-between md:block">
                        <h3 className={`text-3xl md:text-5xl font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#888] group-hover:text-white'}`}>
                          {service.title}
                        </h3>
                        
                        {/* Mobile Accordion Indicator */}
                        <div className="md:hidden">
                           <motion.div animate={{
                        rotate: isActive ? 180 : 0
                      }} className="text-[#555]">
                             <ArrowUpRight className="w-6 h-6" />
                           </motion.div>
                        </div>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence mode="wait">
                        {isActive && <motion.div initial={{
                      opacity: 0,
                      height: 0
                    }} animate={{
                      opacity: 1,
                      height: 'auto'
                    }} exit={{
                      opacity: 0,
                      height: 0
                    }} transition={{
                      duration: 0.4,
                      ease: "easeInOut"
                    }} className="w-full flex flex-col md:flex-row gap-8 md:gap-12 overflow-hidden">
                             {/* Text & Tags Section */}
                             <div className="flex-1 flex flex-col justify-between py-2 order-2 md:order-1">
                                <motion.p initial={{
                          y: 20,
                          opacity: 0
                        }} animate={{
                          y: 0,
                          opacity: 1
                        }} transition={{
                          delay: 0.1,
                          duration: 0.4
                        }} className="text-xl md:text-2xl text-[#8f8f8f] leading-relaxed mb-8">
                                  {service.description}
                                </motion.p>
                                
                                <div className="flex flex-wrap gap-3">
                                  {service.tags.map((tag, i) => <motion.span key={tag} initial={{
                            scale: 0.9,
                            opacity: 0
                          }} animate={{
                            scale: 1,
                            opacity: 1
                          }} transition={{
                            delay: 0.2 + i * 0.05,
                            duration: 0.3
                          }} className="px-4 py-2 rounded-full border border-[#333] text-sm md:text-base text-[#888] hover:text-white hover:border-[#555] transition-colors">
                                      {tag}
                                    </motion.span>)}
                                </div>
                             </div>

                             {/* Image Section */}
                             <motion.div className="w-full md:w-[400px] aspect-[4/3] rounded-xl overflow-hidden order-1 md:order-2" initial={{
                        opacity: 0,
                        x: 20,
                        scale: 0.95
                      }} animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1
                      }} transition={{
                        delay: 0.15,
                        duration: 0.5
                      }}>
                                <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
                             </motion.div>
                          </motion.div>}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="relative w-full h-px overflow-hidden">
                  <div className="absolute inset-0 bg-[#333]" />
                  {isActive && <motion.div layoutId="activeLine" className="absolute inset-0 bg-[#ff4925]" initial={{
                x: '-100%'
              }} animate={{
                x: '0%'
              }} transition={{
                duration: 0.5,
                ease: "circOut"
              }} />}
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};