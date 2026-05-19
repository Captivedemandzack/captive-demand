'use client';

import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { IntegrationsLogoMarquee } from '@/components/services/automation/AutomationIntegrations';
import { ShoreSectionHeader } from '@/components/shore-partnership/ShoreSectionHeader';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';

gsap.registerPlugin(ScrollTrigger);

export function ShorePartnershipIntegrations() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.integration-card');
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: 'power4.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="integrations"
      className="relative w-full overflow-hidden bg-[#FAFAFA] px-container-px py-20 md:py-28"
    >
      <NoiseOverlay />

      <div className="relative z-10 mx-auto max-w-7xl">
        <ShoreSectionHeader
          eyebrow="Integrations"
          lead="Connect every portfolio brand"
          accent="to the tools you already run."
          description="CRMs, booking platforms, EMRs, and marketing stacks. We wire HubSpot, Salesforce, Jane, Zenoti, Klaviyo, and your existing systems into each site without a rip-and-replace."
          descriptionSentenceCase
        />

        <IntegrationsLogoMarquee footnote="Not on the wall? Custom API integrations for any system across your portfolio." />
      </div>
    </section>
  );
}
